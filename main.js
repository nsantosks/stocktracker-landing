// ===============================================
// 1. Lógica del Menú Móvil (Encapsulada)
// ===============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
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
            if (!response.ok) throw new Error('No se pudo cargar el componente desde ' + path);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                if (elementId === 'header-placeholder') {
                    initMobileMenu();
                }
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
// 3. Lógica para filtrar elementos
// ===============================================
function initFiltering(filterSelector, gridId, searchInputId, noResultsId, cardSelector) {
    const filters = document.querySelectorAll(filterSelector);
    const grid = document.getElementById(gridId);
    const searchInput = document.getElementById(searchInputId);
    const noResultsElement = document.getElementById(noResultsId);
    
    if (!grid) return; 
    const cards = Array.from(grid.querySelectorAll(cardSelector));

    function applyFilters() {
        const activeCategories = Array.from(filters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
            const cardName = (card.getAttribute('data-name') || '').toLowerCase();
            
            const categoryMatch = activeCategories.length === 0 || 
                                  activeCategories.some(cat => cardCategories.includes(cat));
            
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

        if (noResultsElement) {
            noResultsElement.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    filters.forEach(filter => filter.addEventListener('change', applyFilters));
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    applyFilters();
}

// ===============================================
// 4. Lógica de Carruseles (Swiper.js)
// ===============================================
function initCarousels() {
    // Carrusel de Productos
    if (document.querySelector('.mySwiperProducts')) {
        new Swiper(".mySwiperProducts", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
}

// ===============================================
// 5. Inicialización General
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Carga de Componentes
    loadComponent('header-placeholder', 'components/header.html'); 
    loadComponent('footer-placeholder', 'components/footer.html');

    // Inicializar Carruseles
    initCarousels();

    // Lógica del Acordeón
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const item = title.parentNode;
            accordionTitles.forEach(otherTitle => {
                const otherItem = otherTitle.parentNode;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Filtrado de Expresiones
    initFiltering('.category-filter', 'expressionsGrid', 'searchInput', 'noResults', '.exp-card');
    
    // Filtrado de Consultores
    initFiltering('.consultant-filter', 'consultantsGrid', 'consultantSearchInput', 'noConsultantsResults', '.consultant-card');
});