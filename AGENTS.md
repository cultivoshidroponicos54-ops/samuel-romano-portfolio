# Arquitectura

Portafolio de Samuel Romano Sánchez completamente en español, desarrollado con TanStack Start y React. `src/routes/index.tsx` contiene las seis secciones y la navegación. `src/routes/__root.tsx` proporciona el documento, el idioma español y metadatos. `src/lib/site.ts` centraliza la identidad y las descripciones.

`src/styles.css` define la identidad visual, variables de ambos temas, diseño adaptable, animaciones y movimiento reducido. El color principal es #80aad3. Conservar la composición editorial de la referencia y no alterar los rasgos ni las proporciones de las fotografías.

`public/img/samuel-inicio.png` es el retrato de Inicio; `public/img/samuel-sobre-mi.png` es el retrato diferente para Sobre mí. Las imágenes usan Netlify Image CDN. `public/icons/` contiene los iconos de herramientas. No agregar imágenes de ejemplo ni proyectos inventados.

`src/lib/projects.ts` mantiene las listas editoriales de diseños y videos. Están vacías hasta que Samuel aporte trabajos reales. Los diseños disponen de un diálogo nativo accesible; los videos usan controles nativos. No hay cargas de usuario, autenticación ni persistencia de datos.

El contenido de la antigua plantilla se eliminó. La infraestructura de Content Collections permanece disponible, con directorios vacíos, pero no alimenta la página actual. Los componentes de formulario heredados no se utilizan ni están publicados.

Usar TypeScript, componentes funcionales y efectos para APIs del navegador. Mantener todos los textos visibles, atributos de accesibilidad y estados en español; los nombres oficiales de aplicaciones y redes se conservan. Los cambios de tema deben usar variables CSS en toda la página y mantener el contraste. IntersectionObserver repite las apariciones al entrar y salir del área visible. Respetar prefers-reduced-motion.

La plataforma ejecuta la validación y la compilación. No generar artefactos de compilación manualmente durante tareas del agente.
