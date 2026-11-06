// Incorporar únicamente trabajos reales proporcionados por Samuel.
// Las imágenes de diseño se colocan en public/img/disenos/<categoría>/; los videos en public/videos.

export type DesignPiece = {
  /** Nombre del trabajo, visible en la galería y en la vista ampliada. */
  title: string
  /** Ruta pública de la imagen, por ejemplo '/img/disenos/packaging/caja-cafe.jpg'. */
  image: string
  /** Descripción breve de la imagen para lectores de pantalla. */
  alt: string
  /** Texto opcional: cliente, año o una línea sobre el proyecto. */
  description?: string
}

export type DesignCategory = {
  id: string
  title: string
  summary: string
  pieces: DesignPiece[]
}

// Para agregar un trabajo, añadir un objeto dentro de `pieces` de su categoría:
// { title: 'Nombre del proyecto', image: '/img/disenos/publicitario/archivo.jpg', alt: 'Descripción de la pieza' }
// Para quitarlo, eliminar el objeto; para reemplazarlo, cambiar la imagen y los textos.
// Las cuatro categorías permanecen vacías hasta que Samuel aporte sus trabajos reales.
export const designCategories: DesignCategory[] = [
  { id: 'publicitario', title: 'DISEÑO PUBLICITARIO', summary: 'Campañas, piezas para redes y gráficas que comunican.', pieces: [] },
  { id: 'packaging', title: 'DISEÑO DE PACKAGING', summary: 'Envases, etiquetas y productos con presencia propia.', pieces: [] },
  { id: 'editorial', title: 'DISEÑO EDITORIAL', summary: 'Revistas, catálogos y composiciones para leer.', pieces: [] },
  { id: 'identidad', title: 'IDENTIDAD VISUAL', summary: 'Logotipos, sistemas gráficos y marcas con carácter.', pieces: [] },
]

// Orden editorial definido por Samuel.
export const videoProjects: { title: string; src: string; poster?: string }[] = [
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-4-marketing.mp4' },
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-1-marketing.mp4' },
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-3-marketing.mp4' },
  { title: 'CREDS DESIGN', src: '/videos/reel-creds-design.mp4' },
  { title: 'PATITAS CALLEJERAS', src: '/videos/patitas-callejeras-perrita-luna.mp4' },
]
