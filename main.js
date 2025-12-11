// 1. Lógica que se ejecuta cuando la página termina de cargar (Menú Móvil)
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos el botón hamburguesa y la lista de enlaces
    const menuToggle = document.querySelector('.menu-toggle'); // Asegúrate de agregar este div en tu HTML
    const navLinks = document.querySelector('.nav-links');

    // Si existen los elementos, activamos el "click"
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Alternamos las clases para activar/desactivar el menú
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });
    }

    // (Opcional) Cerrar el menú automáticamente al hacer clic en un enlace (Mejora la experiencia en móvil)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo en móvil
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            }
        });
    });
});

// 2. Función para cargar componentes (Footer)
function loadComponent(elementId, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el componente');
            }
            return response.text();
        })
        .then(data => {
            // Inyectar el HTML
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;

                // Ejecutar scripts específicos del componente
                // CASO FOOTER: Actualizar año automáticamente
                if (elementId === 'footer-placeholder') {
                    const yearSpan = document.getElementById('current-year');
                    if (yearSpan) {
                        yearSpan.textContent = new Date().getFullYear();
                    }
                }
            }
        })
        .catch(error => console.error('Error:', error));
}