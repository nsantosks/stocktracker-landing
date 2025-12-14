// ===============================================
// 1. Lógica del Menú Móvil (Encapsulada)
// Esta función se llamará después de cargar el Header
// ===============================================
function initMobileMenu() {
    // Seleccionamos el botón hamburguesa y la lista de enlaces
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Si existen los elementos, activamos el "click"
    if (menuToggle && navLinks) {
        // Evento principal para abrir/cerrar el menú
        menuToggle.addEventListener('click', () => {
            // Alternamos las clases para activar/desactivar el menú
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // (Opcional) Cerrar el menú automáticamente al hacer clic en un enlace
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Se ejecuta solo si el menú está activo (típicamente en móvil)
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('is-active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
}

// ===============================================
// 2. Función para cargar componentes (Header y Footer)
// ===============================================
function loadComponent(elementId, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                // NOTA: Para rutas relativas, el fetch puede fallar si no se ejecuta en un servidor (live server).
                throw new Error('No se pudo cargar el componente desde ' + path);
            }
            return response.text();
        })
        .then(data => {
            // Inyectar el HTML
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;

                // ----------------------------------------------------------------
                // EJECUTAR SCRIPTS ESPECÍFICOS DESPUÉS DE LA CARGA
                // ----------------------------------------------------------------

                // CASO HEADER: Inicializar la lógica del menú móvil
                if (elementId === 'header-placeholder') {
                    initMobileMenu(); // Llama a la función definida arriba
                }

                // CASO FOOTER: Actualizar año automáticamente
                if (elementId === 'footer-placeholder') {
                    const yearSpan = document.getElementById('current-year');
                    if (yearSpan) {
                        yearSpan.textContent = new Date().getFullYear();
                    }
                }
            }
        })
        .catch(error => console.error('Error al cargar el componente:', error));
}

// ===============================================
// 3. Lógica para filtrar elementos (Expresiones y Consultores)
// Reutilizamos la misma lógica con selectores diferentes
// ===============================================
function initFiltering(filterSelector, gridId, searchInputId, noResultsId, cardSelector) {
    const filters = document.querySelectorAll(filterSelector);
    const grid = document.getElementById(gridId);
    const searchInput = document.getElementById(searchInputId);
    const noResultsElement = document.getElementById(noResultsId);
    
    // Si la cuadrícula (grid) no existe, salimos
    if (!grid) return; 

    // Convertimos las tarjetas a un Array para poder usar forEach y métodos de Array
    const cards = Array.from(grid.querySelectorAll(cardSelector));

    function applyFilters() {
        const activeCategories = Array.from(filters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').toLowerCase().split(' ');
            const cardName = card.getAttribute('data-name').toLowerCase();
            
            // FILTRADO POR CATEGORÍA
            const categoryMatch = activeCategories.length === 0 || 
                                  activeCategories.some(cat => cardCategories.includes(cat));
            
            // FILTRADO POR BÚSQUEDA (Comprueba nombre y categorías)
            const searchMatch = searchTerm === '' || 
                                cardName.includes(searchTerm) ||
                                cardCategories.join(' ').includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Mostrar u ocultar el mensaje de "No Results"
        if (noResultsElement) {
            noResultsElement.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Event Listeners
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Inicializar el filtro al cargar la página
    applyFilters();
}


// ===============================================
// 4. Lógica que se ejecuta cuando la página termina de cargar
// (Llamadas de Carga de Componentes, Acordeón y Filtros)
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LLAMADAS PARA CARGAR COMPONENTES EXTERNOS ---
    
    loadComponent('header-placeholder', 'components/header.html'); 
    loadComponent('footer-placeholder', 'components/footer.html');

    // --- LÓGICA DEL ACORDEÓN ---
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const item = title.parentNode;
            
            // Cierra todos los ítems que no son el actual
            accordionTitles.forEach(otherTitle => {
                const otherItem = otherTitle.parentNode;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Abre o cierra el ítem actual
            item.classList.toggle('active');
        });
    });

    // --- LÓGICA DE FILTRADO (Expresiones y Consultores) ---
    
    // A. FILTRADO DE EXPRESIONES (Biblioteca)
    initFiltering(
        '.category-filter', 
        'expressionsGrid', 
        'searchInput', 
        'noResults', 
        '.exp-card'
    );
    
    // B. FILTRADO DE CONSULTORES (Nuevo Equipo)
    initFiltering(
        '.consultant-filter', 
        'consultantsGrid', 
        'consultantSearchInput', 
        'noConsultantsResults', 
        '.consultant-card'
    );
});