export const site = {
  name: 'SAMUEL ROMANO SÁNCHEZ',
  role: 'Diseño gráfico y edición de videos',
  description: 'El universo creativo de Samuel Romano Sánchez: diseño gráfico, edición de videos e ideas con identidad propia.',
  summary: 'Diseño gráfico y edición de videos. Ideas, imágenes e historias con identidad propia.',
}

export function pageMeta(title: string, description: string) {
  const fullTitle = `${title} | ${site.name}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
    ],
  }
}
