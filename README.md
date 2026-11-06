# Samuel Romano Sánchez — Portafolio

Portafolio personal en español de diseño gráfico y edición de videos. La identidad combina gris, celeste #80aad3, tipografía de gran formato y las dos fotografías originales de Samuel.

Desarrollado con TanStack Start, React, TypeScript, Tailwind CSS y Lucide. Las fotografías se sirven mediante Netlify Image CDN. No necesita claves, base de datos ni servicios de autenticación.

## Desarrollo local

Con Node 22.13+ o 24 y pnpm:

```sh
pnpm install
netlify dev --port 8889
```

## Incorporar proyectos

Editar `src/lib/projects.ts`. Para diseño, agregar objetos con `title`, `image` y `alt`; colocar las imágenes en `public/img/`. Las miniaturas abren una vista ampliada con cierre mediante botón, fondo o Escape.

Para videos, agregar objetos con `title`, `src` y `poster`; colocar los archivos en `public/videos/` y las miniaturas en `public/img/`. El reproductor HTML permite reproducir, pausar y ampliar el video. Publicar únicamente contenido real facilitado por Samuel. Las colecciones vacías muestran mensajes de próxima publicación.

La página incluye navegación por secciones, menú móvil, temas claro y oscuro, animaciones de aparición repetibles y respeto por la preferencia de movimiento reducido. El tema inicial se adapta al sistema y puede alternarse durante la visita.
