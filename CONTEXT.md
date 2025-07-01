# **Documento de Contexto y Traspaso: Landing Page de StockTracker**

**Fecha de Creación:** 2025-07-01
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

# Proyecto: Landing Page de StockTracker

Este documento resume el estado actual del proyecto de la página de aterrizaje para la plantilla de AppSheet "StockTracker". El objetivo es proporcionar un contexto completo a un asistente de IA (LLM) para continuar con el desarrollo.

## 1. Resumen del Proyecto

- **Producto:** Una plantilla de AppSheet llamada StockTracker para la gestión de inventarios.
- **Objetivo de la Página:** Servir como una página de ventas profesional, explicando las características, beneficios y precios del producto, y capturando leads a través de un flujo de pago.
- **Público Objetivo Principal:** Pequeñas y medianas empresas (Pymes) en Latinoamérica.
- **Público Objetivo Secundario:** Contadores y Auditores que realizan inventarios para clientes.

## 2. Pila Tecnológica (Tech Stack)

- **Frontend:** HTML5, Tailwind CSS (vía CDN), Vanilla JavaScript.
- **Librerías Externas:** Swiper.js (para el slider de módulos, vía CDN).
- **Hosting:** Netlify.
- **Formularios y Backend:** Netlify Forms (para captura de leads) y Notificaciones Nativas de Netlify (para el envío de correos de confirmación).

## 3. Estructura de Archivos

```
stocktracker-landing/
├── img/
│   ├── appviews-desktop/ (imágenes de la app)
│   ├── testimonials/ (fotos de los clientes)
│   ├── banner-03.png (imagen hero para escritorio)
│   ├── hero-mobile.png (imagen hero para móvil)
│   └── ... (otros logos e imágenes)
├── index.html       # Archivo principal de la página
├── style.css        # Estilos personalizados (colores, slider, etc.)
├── CONTEXT.md       # Este mismo archivo
└── README.md        # Descripción general para GitHub
```

## 4. Características Principales y Flujo de la Página

La página está estructurada como un embudo de ventas:

1.  **Header Pegajoso (Sticky):** Con navegación a las secciones clave.
2.  **Sección Hero:** Con un título potente y "Art Direction" (imágenes separadas para móvil y escritorio para evitar cortes).
3.  **Sección de Funciones:** Tarjetas que describen las capacidades de la app.
4.  **Sección "Para Quién Es":** Define y conecta con el público objetivo.
5.  **Sección de Módulos:** **Implementada como un slider de Swiper.js** para ser más compacta e interactiva. Los textos están reescritos para enfocarse en beneficios.
6.  **Sección de Testimonios:** Prueba social con 3 perfiles de cliente clave.
7.  **Sección de Demo Interactiva:** Con "Art Direction":
    -   **Móvil:** Muestra una imagen y un botón para abrir la demo en una nueva pestaña (evita sobrecargar el dispositivo).
    -   **Escritorio:** Muestra un `<iframe>` con la demo interactiva funcional.
8.  **Sección de Precios:** Estructura de 3 niveles:
    -   **Esencial:** El producto base.
    -   **Profesional:** El más popular, destacado visualmente y con un toque de escasez ("¡Plazas limitadas!").
    -   **A Medida:** Para proyectos personalizados.
9.  **Sección de FAQ:** Responde a las objeciones más comunes.
10. **Sección CTA (Call to Action):** Un último llamado a la acción. El botón tiene texto y padding responsivos para evitar cortes en móvil.
11. **Footer:** Con un toque personal del creador.

## 5. Funcionalidad Interactiva Clave: Flujo de Pago

El flujo de pago está implementado completamente en el frontend con JavaScript y se integra con Netlify Forms.

1.  **Activación:** El usuario hace clic en uno de los botones de la sección de precios (`.payment-btn`).
2.  **Apertura del Modal:** Se abre un formulario modal responsive (`#checkout-modal`). El plan seleccionado (`data-plan`) y la URL de redirección (`data-paypal-url`) se almacenan en variables de JavaScript.
3.  **Captura de Datos:** El usuario rellena el formulario con su información. El formulario incluye validación básica para campos obligatorios y formato de email.
4.  **Envío del Formulario:**
    -   Al hacer clic en "Guardar y Continuar", se muestra un indicador de carga.
    -   Los datos del formulario se envían a Netlify Forms usando una petición `fetch`.
5.  **Redirección:** Si el envío a Netlify es exitoso, el usuario es redirigido a la URL de PayPal o WhatsApp correspondiente.
6.  **Confirmación por Correo:** **No se usa una función serverless.** Se ha configurado una **notificación nativa de Netlify Forms** para que, tras cada envío exitoso, envíe automáticamente un correo de confirmación al email proporcionado por el cliente.

## 6. Enlaces Externos y Endpoints

-   **Plan Esencial (PayPal):** `https://www.paypal.com/ncp/payment/6R7TRSBXUAGP8`
-   **Plan Profesional (PayPal):** `https://www.paypal.com/ncp/payment/ALQK2Q7X6KYVG`
-   **Plan a Medida (WhatsApp):** `https://wa.link/650405`
-   **Demo AppSheet:** `https://www.appsheet.com/start/5d3f3159-865d-4d66-987a-469bb5e2b1ab`

## 7. Flujo de Desarrollo y Despliegue

-   El código fuente se gestiona en un repositorio de Git.
-   El repositorio está alojado en GitHub.
-   El sitio está conectado a Netlify.
-   **El despliegue es continuo y automático:** Cada vez que se hace un `git push` a la rama `main`, Netlify reconstruye y despliega la nueva versión del sitio automáticamente.

## 8. Estado Actual y Últimos Cambios Implementados

-   El flujo de pago y el formulario modal están completamente implementados.
-   La sección de Módulos fue convertida exitosamente a un slider de Swiper.js.
-   Se solucionaron problemas de responsive en la sección Hero y CTA, implementando "Art Direction" y texto/padding adaptables.
-   Se solucionó un problema con la demo interactiva en móviles, mostrando una alternativa más ligera.
-   Se configuró el envío de correos usando las notificaciones nativas de Netlify en lugar de una función serverless con SendGrid/Mailgun para evitar bloqueos regionales.
-   El código ha sido revisado en busca de errores y se considera estable y listo para producción.