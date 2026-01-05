const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// 1. Configuración básica
const hostname = 'https://gammalielanalytics.com';
const sitemapPath = './sitemap.xml';

// 2. Definición de prioridades por carpeta principal
const priorityMap = {
  'catalogo': 0.8,
  'recursos': 0.7,
  'biblioteca-appsheet': 0.85,
  'directorio-consultores': 0.8, // Prioridad alta para captar búsquedas de expertos
  'root': 1.0 
};

// Función para obtener todos los archivos HTML de forma recursiva
function getHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      // EXCLUSIONES CRÍTICAS: No queremos que Google indexe estas carpetas
      if (
        file !== 'node_modules' && 
        file !== 'assets' && 
        file !== 'components' &&         // Fragmentos de código (header/footer)
        file !== 'stocktracker-favicon' && // Iconos de sistema
        !file.startsWith('.')              // Carpetas ocultas como .git
      ) {
        arrayOfFiles = getHtmlFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Solo archivos HTML
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function generate() {
  const links = [];
  const allFiles = getHtmlFiles('./');

  allFiles.forEach(filePath => {
    // Normalizar la ruta para la URL (Windows usa \, Web usa /)
    let urlPath = filePath.replace(/\\/g, '/');
    
    // Identificar la carpeta raíz de la página para asignar prioridad
    const pathParts = urlPath.split('/');
    const firstFolder = pathParts[0];
    
    let priority = 0.5; // Prioridad por defecto para páginas legales o sueltas

    if (urlPath === 'index.html') {
      priority = priorityMap.root;
    } else if (priorityMap[firstFolder]) {
      priority = priorityMap[firstFolder];
    }

    // LIMPIEZA DE URL PARA SEO:
    // 1. Quitamos 'index.html' si existe al final
    let cleanUrl = urlPath.replace(/index\.html$/, '');
    // 2. Quitamos la extensión '.html' de los archivos sueltos
    cleanUrl = cleanUrl.replace(/\.html$/, '');
    // 3. Aseguramos que las carpetas terminen en slash (opcional, según tu servidor)
    if (cleanUrl !== '' && !cleanUrl.endsWith('/') && fs.statSync(filePath).name === 'index.html') {
        cleanUrl += '/';
    }

    links.push({
      url: `/${cleanUrl}`,
      changefreq: firstFolder === 'biblioteca-appsheet' ? 'monthly' : 'weekly',
      priority: priority,
      lastmod: fs.statSync(filePath).mtime.toISOString()
    });
  });

  // Crear el stream del sitemap con formato profesional
  const stream = new SitemapStream({ hostname });
  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  fs.writeFileSync(sitemapPath, xmlString);
  console.log(`\n✅ SITEMAP GENERADO CON ÉXITO`);
  console.log(`--------------------------------`);
  console.log(`Páginas encontradas: ${links.length}`);
  console.log(`Archivo actualizado en: ${sitemapPath}\n`);
}

generate().catch(err => {
    console.error('❌ Error generando el sitemap:', err);
});