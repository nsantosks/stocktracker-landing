function loadComponent(elementId, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el componente');
            }
            return response.text();
        })
        .then(data => {
            // 1. Inyectar el HTML
            document.getElementById(elementId).innerHTML = data;
            
            // 2. Ejecutar scripts específicos del componente (como el año actual)
            if (elementId === 'footer-placeholder') {
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            }
        })
        .catch(error => console.error('Error:', error));
}