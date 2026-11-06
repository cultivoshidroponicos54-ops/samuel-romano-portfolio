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
// Las piezas se muestran en el orden exacto en que Samuel las entregó; no reordenar.
export const designCategories: DesignCategory[] = [
  { id: 'publicitario', title: 'DISEÑO PUBLICITARIO', summary: 'Campañas, piezas para redes y gráficas que comunican.', pieces: [
    { title: 'CREDS DESIGN | AGENCIA DE DISEÑO', image: '/img/disenos/publicitario/01-carrusel-creds-design.png', alt: 'Pieza publicitaria para Creds Design con un equipo de trabajo reunido alrededor de una mesa vista desde arriba' },
    { title: 'AFICHE | PAULO LONDRA', image: '/img/disenos/publicitario/02-afiche-paulo-londra.png', alt: 'Afiche dedicado a Paulo Londra' },
    { title: 'PRÓXIMAMENTE | SKETCHUP', image: '/img/disenos/publicitario/03-afiche-proximamente.png', alt: 'Afiche de lanzamiento de una nueva línea de moda con una persona de espaldas que viste un buzo negro con el logotipo Sketchup' },
    { title: 'CARRUSEL PUBLICITARIO', image: '/img/disenos/publicitario/04-carrusel-4.png', alt: 'Pieza de carrusel publicitario para redes sociales' },
    { title: 'ESTRATEGIAS PARA ATRAER MÁS CLIENTES', image: '/img/disenos/publicitario/05-carrusel-clientes.png', alt: 'Pieza de carrusel que compara artículos promocionales antes y después de aplicar una comunicación de marca coherente' },
    { title: 'CARRUSEL PUBLICITARIO', image: '/img/disenos/publicitario/06-carrusel-3.png', alt: 'Pieza de carrusel publicitario para redes sociales' },
  ] },
  { id: 'packaging', title: 'DISEÑO DE PACKAGING', summary: 'Envases, etiquetas y productos con presencia propia.', pieces: [] },
  { id: 'editorial', title: 'DISEÑO EDITORIAL', summary: 'Revistas, catálogos y composiciones para leer.', pieces: [
    { title: 'ORIGEN | PORTADA DE REVISTA', image: '/img/disenos/editorial/portada-revista-origen.png', alt: 'Portada de la revista Origen, edición especial Fray Mamerto Esquiú, con una iglesia blanca y el titular Patrimonio que inspira' },
  ] },
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
