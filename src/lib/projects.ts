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
  /** Imágenes de un proyecto agrupado, en orden. Si existe, la tarjeta abre todas en una sola presentación. */
  gallery?: { image: string; alt: string }[]
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
    { title: 'ESTRATEGIAS PARA ATRAER MÁS CLIENTES', image: '/img/disenos/publicitario/05-carrusel-clientes.png', alt: 'Pieza de carrusel que compara artículos promocionales antes y después de aplicar una comunicación de marca coherente' },
    { title: 'CARRUSEL PUBLICITARIO', image: '/img/disenos/publicitario/06-carrusel-3.png', alt: 'Pieza de carrusel publicitario para redes sociales' },
    { title: 'CARRUSEL PUBLICITARIO', image: '/img/disenos/publicitario/04-carrusel-4.png', alt: 'Pieza de carrusel publicitario para redes sociales' },
    { title: 'AFICHE | PAULO LONDRA', image: '/img/disenos/publicitario/02-afiche-paulo-londra.png', alt: 'Afiche dedicado a Paulo Londra' },
    { title: 'PRÓXIMAMENTE | SKETCHUP', image: '/img/disenos/publicitario/03-afiche-proximamente.png', alt: 'Afiche de lanzamiento de una nueva línea de moda con una persona de espaldas que viste un buzo negro con el logotipo Sketchup' },
  ] },
  { id: 'packaging', title: 'DISEÑO DE PACKAGING', summary: 'Envases, etiquetas y productos con presencia propia.', pieces: [] },
  { id: 'editorial', title: 'DISEÑO EDITORIAL', summary: 'Revistas, catálogos y composiciones para leer.', pieces: [
    { title: 'ORIGEN | PORTADA DE REVISTA', image: '/img/disenos/editorial/portada-revista-origen.png', alt: 'Portada de la revista Origen, edición especial Fray Mamerto Esquiú, con una iglesia blanca y el titular Patrimonio que inspira' },
  ] },
  { id: 'identidad', title: 'IDENTIDAD VISUAL', summary: 'Logotipos, sistemas gráficos y marcas con carácter.', pieces: [
    { title: 'CREDS DESIGN | AGENCIA DE DISEÑO', image: '/img/disenos/identidad/creds-design/01-creds-design.png', alt: 'Logotipo de Creds Design sobre fondo blanco', gallery: [
      { image: '/img/disenos/identidad/creds-design/01-creds-design.png', alt: 'Logotipo de Creds Design sobre fondo blanco' },
      { image: '/img/disenos/identidad/creds-design/02-creds-design.png', alt: 'Variantes del logotipo de Creds Design sobre fondos blanco, lavanda y oscuro' },
      { image: '/img/disenos/identidad/creds-design/03-creds-design.png', alt: 'Paleta de color de Creds Design con los tonos #8e9ed0 y #141127' },
      { image: '/img/disenos/identidad/creds-design/04-creds-design.png', alt: 'Tipografías de Creds Design: Montserrat y Open Sauce' },
      { image: '/img/disenos/identidad/creds-design/05-creds-design.png', alt: 'Portada de la sección Aplicaciones de la identidad de Creds Design' },
      { image: '/img/disenos/identidad/creds-design/06-creds-design.png', alt: 'Aplicaciones de la marca Creds Design en chomba, gorra, bolsa, botella, caja y funda de teléfono' },
    ] },
    { title: 'ESPRESSO AMERICANO', image: '/img/disenos/identidad/espresso-americano/01-logo.png', alt: 'Logotipo de Espresso Americano con una taza roja sobre un plato verde', gallery: [
      { image: '/img/disenos/identidad/espresso-americano/01-logo.png', alt: 'Logotipo de Espresso Americano con una taza roja sobre un plato verde' },
      { image: '/img/disenos/identidad/espresso-americano/02-variantes.png', alt: 'Variantes del logotipo de Espresso Americano en blanco sobre fondos rojo y verde' },
      { image: '/img/disenos/identidad/espresso-americano/03-ilustraciones.png', alt: 'Ilustraciones de Espresso Americano con personas tomando café, una medialuna y un vaso' },
      { image: '/img/disenos/identidad/espresso-americano/04-mockups.png', alt: 'Mockups de bolsas de café blancas de Espresso Americano' },
      { image: '/img/disenos/identidad/espresso-americano/05-mockups-vaso-1.png', alt: 'Mockup de vasos térmicos blancos de Espresso Americano' },
      { image: '/img/disenos/identidad/espresso-americano/06-mockups-vaso-2.png', alt: 'Mockup de vasos térmicos rojos de Espresso Americano' },
      { image: '/img/disenos/identidad/espresso-americano/07-mockups-vaso-3.png', alt: 'Mockup de vasos térmicos verdes de Espresso Americano' },
    ] },
  ] },
]

// Orden editorial definido por Samuel.
export const videoProjects: { title: string; src: string; poster?: string }[] = [
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-4-marketing.mp4' },
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-1-marketing.mp4' },
  { title: 'PATRICIAN | AGENCIA DE MARKETING', src: '/videos/video-3-marketing.mp4' },
  { title: 'CREDS DESIGN', src: '/videos/reel-creds-design.mp4' },
  { title: 'PATITAS CALLEJERAS', src: '/videos/patitas-callejeras-perrita-luna.mp4' },
]
