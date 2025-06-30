# **Documento de Contexto y Traspaso: Landing Page de StockTracker**

**Fecha de Creación:** 2024-10-27
**Versión del Proyecto:** 1.2 (Implementación de Flujo de Pago con Modales)
**Autor del Documento:** (/[Creado por Ing. Nestor Santos/ Gammaliel Analytics](https://www.linkedin.com/in/ingnsantos/), con asistencia de Gemmini 2.5 Pro)

---

### **Índice**

1.  [Resumen del Proyecto](#1-resumen-del-proyecto)
2.  [Pila Tecnológica](#2-pila-tecnológica)
3.  [Estructura de Archivos](#3-estructura-de-archivos)
4.  [Guía de Estilo y Branding](#4-guía-de-estilo-y-branding)
5.  [Lógica y Funcionalidades Clave](#5-lógica-y-funcionalidades-clave)
6.  [Estrategia de Contenido y Ventas](#6-estrategia-de-contenido-y-ventas)
7.  [Flujo de Trabajo de Desarrollo y Despliegue](#7-flujo-de-trabajo-de-desarrollo-y-despliegue)
8.  [Estado Actual y Próximos Pasos](#8-estado-actual-y-próximos-pasos)

---

### **1. Resumen del Proyecto**

Este proyecto es una **página de aterrizaje (landing page) estática** cuyo objetivo principal es **vender una plantilla de AppSheet llamada "StockTracker"**. La página está diseñada para ser un embudo de ventas completo, guiando al usuario desde el descubrimiento del problema hasta la compra.

**Público Objetivo Principal:**
*   Dueños de Pequeñas y Medianas Empresas (Pymes) que gestionan inventario físico (tiendas, talleres, bodegas, e-commerce).
*   **Público Objetivo Secundario (Nicho de Alto Valor):** Contadores y Auditores que realizan tomas físicas de inventario para sus clientes.

**Problema que Resuelve:** La gestión de inventario manual, tediosa y propensa a errores que se realiza comúnmente con hojas de cálculo (Excel).

**Solución Propuesta:** Una plantilla de AppSheet robusta y accesible que centraliza, simplifica y automatiza el control de inventario.

---

### **2. Pila Tecnológica**

El proyecto es deliberadamente simple para garantizar un rendimiento rápido y un mantenimiento fácil.

*   **HTML5:** Para la estructura semántica del contenido.
*   **CSS3 (archivo `style.css`):** Para estilos personalizados y clases reutilizables.
*   **Tailwind CSS (vía CDN):** Framework principal para el diseño responsivo (mobile-first) y utilidades de estilo.
*   **JavaScript (vanilla, en línea):** Para funcionalidades interactivas como el scroll suave y la lógica de los modales de pago.
*   **Fuentes:** Google Fonts (familia 'Inter').
*   **Hosting:** Desplegado en GitHub Pages.

---

### **3. Estructura de Archivos**

La estructura del proyecto es la siguiente:

```
stocktracker-landing/
│
├── img/
│   ├── appviews-desktop/ (Capturas de la app)
│   ├── testimonials/     (Fotos para testimonios)
│   ├── logo-footer.png
│   └── logo-header.png
│
├── index.html          (Archivo principal de la página)
├── style.css           (Estilos personalizados)
├── README.md           (Documentación pública del proyecto)
└── CONTEXT.md          (Este documento)
```

---

### **4. Guía de Estilo y Branding**

*   **Fuente Principal:** 'Inter' de Google Fonts.
*   **Color Primario (Azul):** `#1976D2` (Clase: `.bg-primary`, `.text-primary`, `.border-primary`)
*   **Color Secundario (Gris Claro):** `#F5F5F5` (Clase: `.bg-secondary`)
*   **Logo:** Se utilizan dos versiones, una para el header y otra para el footer, ubicadas en la carpeta `img/`.

---

### **5. Lógica y Funcionalidades Clave**

#### 5.1 Scroll Suave
Un script simple en `index.html` captura los clics en los enlaces de ancla (`<a href="#...">`) y realiza un desplazamiento suave hacia la sección correspondiente.

#### 5.2 Modales de Flujo de Pago (Lógica más compleja)
Esta es la funcionalidad más avanzada y se controla con el JavaScript al final de `index.html`.

*   **Activación:** Los botones de compra no son enlaces (`<a>`), son botones (`<button>`) que llaman a la función `openPaymentModal('plan')`. El parámetro `'plan'` ('esencial', 'pro', 'medida') se guarda en la variable `selectedPlan` para un uso futuro.
*   **Modal 1 (Elección):** Se muestra el modal `#payment-choice-modal`, que permite elegir entre "Transferencia Bancaria" y "PayPal".
*   **Modal 2 (Formulario Bancario):** Si se elige transferencia, se oculta el Modal 1 y se muestra `#bank-form-modal`. Este modal contiene los datos bancarios y un formulario para reportar el pago.
    *   **Envío del Formulario:** El evento `submit` del formulario es capturado para prevenir la recarga de la página (`e.preventDefault()`). **Actualmente, este formulario es solo front-end.** La lógica para enviar los datos a un backend no está implementada.
*   **Opción PayPal:** Si se elige PayPal, se llama a la función `redirectToPaypal()`. **Actualmente, esta función muestra una alerta y debe ser configurada con el enlace de pago de PayPal real.**
*   **Modal 3 (Éxito):** Tras el envío "exitoso" del formulario bancario, se muestra el modal `#success-modal`.
*   **Cierre de Modales:** La función `closeModal()` oculta todos los modales. Se puede activar con los botones de "Cancelar" o haciendo clic fuera del contenido del modal.

**Código de Control de Modales (Snapshot):**
```javascript
// (Fragmento del JS en index.html)
const modalContainer = document.getElementById('modal-container');
// ... (otras declaraciones de variables de modales)

let selectedPlan = '';

function openPaymentModal(plan) {
    selectedPlan = plan;
    modalContainer.style.display = 'flex';
    paymentChoiceModal.style.display = 'block';
    // ... (lógica para ocultar otros modales)
}
// ... (resto de las funciones: closeModal, showBankForm, redirectToPaypal, etc.)
```

---

### **6. Estrategia de Contenido y Ventas**

La página está estructurada como un embudo de ventas que utiliza varios disparadores psicológicos:

*   **Copywriting Orientado a Beneficios:** El texto (especialmente en la sección de "Módulos") se enfoca en el resultado que obtiene el cliente, no en la característica técnica.
*   **Prueba Social:** La sección de testimonios valida las afirmaciones del producto con casos de uso reales de los tres perfiles de cliente objetivo.
*   **Autoridad:** Frases sutiles como "Como usan los profesionales" posicionan la herramienta como una solución estándar de la industria.
*   **Precios por Niveles (Tiered Pricing):** Se utiliza el modelo de 3 opciones (Esencial, Profesional, A Medida) para anclar el precio y hacer que el "Paquete Profesional" se perciba como la mejor oferta (efecto "Más Popular").
*   **Escasez/Urgencia:** En el paquete profesional se añadió la línea "¡Plazas de implementación limitadas cada mes!" y el botón "Asegurar mi Plaza Pro" para incentivar la toma de decisión y combatir la procrastinación del comprador.

---

### **7. Flujo de Trabajo de Desarrollo y Despliegue**

*   **Control de Versiones:** El proyecto se gestiona con Git y está alojado en un repositorio de GitHub.
*   **Comandos de Actualización:** El flujo de trabajo estándar para subir cambios es:
    1.  `git add .` (Añadir todos los cambios)
    2.  `git commit -m "Descripción clara del cambio"` (Guardar los cambios localmente)
    3.  `git push origin main` (Subir los cambios a GitHub)
*   **Despliegue (Deployment):** El sitio está desplegado automáticamente a través de **GitHub Pages** desde la rama `main`. Cualquier `push` a esta rama actualizará el sitio en vivo en minutos.

---

### **8. Estado Actual y Próximos Pasos**

**Estado Actual:**
El desarrollo del front-end de la landing page está completo. Todas las secciones están implementadas y son responsivas. El flujo de pago con modales está visualmente y funcionalmente implementado en la interfaz, pero carece de conexión con un backend.

**Limitaciones Conocidas / Deuda Técnica:**
1.  **Formulario de Pago Desconectado:** El formulario de transferencia bancaria es **100% front-end**. Actualmente no envía los datos a ningún lugar. Esta es la principal tarea pendiente.
2.  **Enlace de PayPal Genérico:** La función `redirectToPaypal()` solo muestra una alerta y necesita ser actualizada con el enlace de pago real.

**Próximos Pasos Recomendados (Roadmap):**
1.  **Implementar un Backend para el Formulario:**
    *   **Opción A (Simple):** Usar un servicio como [SheetDB](https://sheetdb.io/) o un script de Google Apps para enviar los datos del formulario directamente a una hoja de cálculo de Google Sheets. Esto crearía un CRM/base de datos de clientes básico y automático.
    *   **Opción B (Avanzada):** Crear un pequeño endpoint en un servicio serverless (como Vercel Functions o Netlify Functions) que reciba los datos y los procese (ej. enviar un email).
2.  **Configurar Enlaces de Pago de PayPal:** Crear enlaces de pago específicos para cada plan en PayPal y actualizar la función `redirectToPaypal()`.
3.  **Añadir Notificaciones por Email:** Tras el envío del formulario, usar el backend para enviar un correo de confirmación automático al cliente ("Hemos recibido tu reporte de pago...") y una notificación al administrador ("¡Nueva venta reportada!").
4.  **Integrar Pasarelas de Pago Venezolanas:** Para reducir la fricción, evaluar la integración de una pasarela de pago como PagoFlash o Instapago para automatizar los pagos en Bolívares.