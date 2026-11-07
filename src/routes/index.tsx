import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, ArrowUp, Sun, Moon, Menu, X, PenTool, Film, Play, Mail, MessageCircle, Plus, Sparkles, Volume2, VolumeX, Pause, RotateCcw, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { pageMeta, site } from '../lib/site'
import { designCategories, videoProjects, type DesignCategory, type DesignPiece } from '../lib/projects'
import { Instagram, Linkedin } from '../components/SocialIcons'
import LogoLoop from '../components/LogoLoop/LogoLoop'

type Tool = { name: string; file: string; color: string; detail: string }
const tools: Tool[] = [
  { name: 'Adobe Illustrator', file: 'illustrator', color: '#ff9a00', detail: 'Diseño vectorial e identidad visual' },
  { name: 'Adobe Photoshop', file: 'photoshop', color: '#31a8ff', detail: 'Edición y retoque fotográfico' },
  { name: 'Adobe InDesign', file: 'indesign', color: '#ff3366', detail: 'Diseño y composición editorial' },
  { name: 'Adobe Lightroom', file: 'lightroom', color: '#31a8ff', detail: 'Revelado y corrección de color' },
  { name: 'Affinity', file: 'affinity', color: '#a7f175', detail: 'Diseño y edición gráfica' },
  { name: 'CapCut', file: 'capcut', color: 'var(--ink)', detail: 'Edición y producción audiovisual' },
]
const renderTool = (tool: Tool) => {
  const i = tools.indexOf(tool)
  return <div className="tool" style={{'--tool-color':tool.color,'--delay':`${i*90}ms`} as React.CSSProperties}><span className="tool-number">0{i+1}</span><div className="tool-icon"><img src={`/icons/${tool.file}.svg`} alt={`Icono de ${tool.name}`} draggable={false}/></div><h3>{tool.name}</h3><p>{tool.detail}</p><ArrowUpRight className="tool-arrow" size={19}/></div>
}

export const Route = createFileRoute('/')({ component: PortfolioHome, head: () => pageMeta('Portafolio creativo', site.description) })
const navigation = [['inicio','Inicio'],['sobre-mi','Sobre mí'],['herramientas','Herramientas'],['diseno','Diseño gráfico'],['videos','Edición de videos'],['contacto','Contacto']]
const picture = (name: string) => `/.netlify/images?url=/img/${name}&w=1000&fm=webp`
// Miniaturas optimizadas con Netlify Image CDN: solo cambian de tamaño y formato, sin recortes ni deformaciones.
const thumb = (src: string, w: number) => `/.netlify/images?url=${src}&w=${w}&q=85&fm=webp`
const thumbSet = (src: string) => [480, 800, 1200].map(w => `${thumb(src, w)} ${w}w`).join(', ')
const thumbSizes = '(max-width: 700px) 86vw, 470px'
const EAGER_THUMBS = 4
const piecesOf = (p: DesignPiece): DesignPiece[] => p.gallery?.length ? p.gallery.map(g => ({ title: p.title, image: g.image, alt: g.alt, description: p.description })) : [p]
// Precalienta las miniaturas visibles de una carpeta antes de abrirla.
const warmFolder = (c: DesignCategory) => c.pieces.slice(0, EAGER_THUMBS).forEach(p => { const img = new Image(); img.sizes = thumbSizes; img.srcset = thumbSet(p.image) })

function StageImage({ piece }: { piece: DesignPiece }) {
  // Muestra al instante la miniatura y la reemplaza por el archivo original completo en cuanto termina de cargar.
  const [loaded, setLoaded] = useState(false)
  const full = useRef<HTMLImageElement>(null)
  useEffect(() => { if (full.current?.complete && full.current.naturalWidth) setLoaded(true) }, [])
  return <div className={loaded ? 'stage-frame loaded' : 'stage-frame'} aria-busy={!loaded}><img className="stage-preview" src={thumb(piece.image, 1200)} alt="" aria-hidden="true" decoding="async"/><img ref={full} className="stage-full" src={piece.image} alt={piece.alt} decoding="async" fetchPriority="high" onLoad={() => setLoaded(true)}/></div>
}

function PortfolioHome() {
  const [dark, setDark] = useState(true)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('inicio')
  const [viewer, setViewer] = useState<{ pieces: DesignPiece[]; index: number } | null>(null)
  const [folder, setFolder] = useState<DesignCategory | null>(null)
  const folderDialog = useRef<HTMLDialogElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting)), { threshold: .08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-15% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(el => sections.observe(el))
    return () => { observer.disconnect(); sections.disconnect() }
  }, [])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const isViewerOpen = viewer !== null
  const piece = viewer ? viewer.pieces[viewer.index] : null
  const showPiece = (step: number) => setViewer(v => v && { ...v, index: (v.index + step + v.pieces.length) % v.pieces.length })
  useEffect(() => { if (isViewerOpen && !dialog.current?.open) dialog.current?.showModal() }, [isViewerOpen])
  useEffect(() => {
    if (!isViewerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); showPiece(-1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); showPiece(1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isViewerOpen])
  useEffect(() => {
    // Precarga las piezas vecinas para que la navegación sea inmediata.
    if (!viewer || viewer.pieces.length < 2) return
    const total = viewer.pieces.length
    ;[1, -1].forEach(step => { const next = viewer.pieces[(viewer.index + step + total) % total].image; const preview = new Image(); preview.src = thumb(next, 1200); const img = new Image(); img.src = next })
  }, [viewer])
  useEffect(() => { if (folder) folderDialog.current?.showModal() }, [folder])
  return <div className="portfolio">
    <header className="header"><a href="#inicio" className="monogram" aria-label="Samuel Romano Sánchez, inicio">sr<span>•</span></a><nav className={menu ? 'navigation open' : 'navigation'} aria-label="Navegación principal">{navigation.map(([id,label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenu(false)}>{label}</a>)}</nav><div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Activar tema claro' : 'Activar tema oscuro'}><span className="theme-icon" key={dark ? 'sol' : 'luna'} aria-hidden="true">{dark ? <Sun size={19}/> : <Moon size={19}/>}</span></button><button className="icon-button menu-toggle" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></header>
    <section id="inicio" className="hero">
      <div className="hero-top"><span><i/> DISEÑO GRÁFICO & EDICIÓN DE VIDEOS</span><span className="hero-top-right">IDEAS QUE SE VUELVEN IMÁGENES <ArrowUpRight size={16}/></span></div>
      <div className="hero-type"><span className="quote">“</span><span className="hero-highlight"/><h1>PORTA<span>FOLIO<span className="period">.</span></span></h1><span className="creative-label">Diseño con identidad</span><PenTool className="doodle pen" size={43} strokeWidth={1.2}/><Sparkles className="doodle sparkle" size={38} strokeWidth={1.1}/></div>
      <div className="hero-portrait"><div className="orbit"/><div className="portrait-block"/><img src={picture('samuel-inicio.png')} alt="Samuel Romano Sánchez, retrato de inicio" fetchPriority="high"/><span className="portrait-sticker"><ArrowUpRight/> Una mirada creativa</span></div>
      <div className="hero-intro"><p className="eyebrow">HOLA, SOY</p><h2>SAMUEL ROMANO<br/>SÁNCHEZ<span>.</span></h2><p>Diseño gráfico y edición de videos.<br/>Ideas, imágenes e historias con identidad propia.</p><a href="#diseno" className="button">Ver mis trabajos <ArrowUpRight size={19}/></a></div>
      <a className="scroll-cue" href="#sobre-mi"><span>Desliza para conocerme</span><ArrowDown size={18}/></a><span className="side-note">SAMUEL ROMANO SÁNCHEZ · PORTAFOLIO</span>
    </section>
    <div className="ticker" aria-hidden="true"><span>DISEÑO CON IDENTIDAD</span><span>✳</span><span>HISTORIAS EN MOVIMIENTO</span><span>✳</span><span>IDEAS QUE CONECTAN</span><span>✳</span></div>
    <section id="sobre-mi" className="section about"><SectionLabel number="02" label="Un poco sobre mí"/><div className="about-grid"><div className="about-photo reveal"><span className="photo-backdrop"/><img src={picture('samuel-sobre-mi.png')} alt="Samuel Romano Sánchez, retrato para Sobre mí" loading="lazy"/><span className="photo-caption">Detrás de cada idea, una mirada propia. <ArrowUpRight size={18}/></span></div><div className="about-copy reveal"><p className="eyebrow">CREATIVIDAD EN CADA DETALLE</p><h2>¡HOLA<span>!</span><br/>SOY SAMUEL<span>.</span></h2><p>Mi forma de expresarme está en lo visual: el diseño gráfico y la edición de videos.</p><p>Este es mi espacio para compartir ideas, explorar imágenes y dar forma a historias. Una mirada personal que une diseño y movimiento.</p><div className="discipline-tags"><span><PenTool size={16}/> Diseño gráfico</span><span><Film size={16}/> Edición audiovisual</span></div><a className="text-link" href="#contacto">Hablemos de tu próxima idea <ArrowUpRight size={21}/></a></div></div></section>
    <section id="herramientas" className="section tools"><SectionLabel number="03" label="Mi caja de herramientas"/><div className="section-heading reveal"><h2>DE LA IDEA<br/>A LA <span className="marked">FORMA.</span></h2><p>Las herramientas que acompañan<br/>mi proceso creativo.</p></div><div className="tools-grid tools-loop reveal"><LogoLoop logos={tools} renderItem={renderTool} speed={100} direction="left" logoHeight={66} gap={1} hoverSpeed={0} scaleOnHover={false} ariaLabel="Herramientas de trabajo"/></div></section>
    <section id="diseno" className="section designs"><SectionLabel number="04" label="Exploraciones visuales"/><div className="section-heading reveal"><h2>DISEÑO<br/><span className="marked">GRÁFICO.</span></h2><p>Un espacio para las ideas<br/>que toman forma.</p></div><div className="folder-grid">{designCategories.map((c,i) => <button type="button" className="folder reveal" key={c.id} style={{'--delay':`${i*90}ms`} as React.CSSProperties} onClick={() => setFolder(c)} onPointerEnter={() => warmFolder(c)} onFocus={() => warmFolder(c)} aria-label={`Abrir carpeta ${c.title}`}><span className="folder-tab">0{i+1}</span><span className="folder-body"><span className="folder-sheets" aria-hidden="true"/><span className="small-label">{c.pieces.length ? `${c.pieces.length} ${c.pieces.length === 1 ? 'trabajo' : 'trabajos'}` : 'CARPETA EN PREPARACIÓN'}</span><h3>{c.title}</h3><p>{c.summary}</p><span className="folder-open">Abrir carpeta <ArrowUpRight size={18}/></span></span></button>)}</div></section>
    <section id="videos" className="section videos"><SectionLabel number="05" label="Historias en movimiento"/><div className="section-heading reveal"><h2>EDICIÓN<br/>DE <span className="marked">VIDEOS.</span></h2><p>Ritmo, imagen y narrativa.<br/>Una nueva forma de contar.</p></div>{videoProjects.length ? <div className="video-grid">{videoProjects.map((video,i) => <VideoCard key={video.src} video={video} index={i}/>)}</div> : <div className="empty-video reveal"><div className="video-top"><span><i/> PRÓXIMAMENTE</span><Film size={23}/></div><div className="video-center"><span className="play-symbol"><Play size={31} fill="currentColor"/></span><h3>La próxima historia<br/>está por comenzar.</h3><p>Los proyectos audiovisuales aparecerán aquí.</p></div><div className="video-bottom"><span>EDICIÓN AUDIOVISUAL</span><span className="timeline"/><span>EN PREPARACIÓN</span></div></div>}</section>
    <section id="contacto" className="section contact"><SectionLabel number="06" label="El comienzo de una buena idea"/><div className="contact-heading reveal"><p className="eyebrow">¿TIENES ALGO EN MENTE?</p><h2>HAGAMOS<br/>QUE <span>SUCEDA<ArrowUpRight/></span></h2><p>Una idea, un proyecto o una conversación.<br/>Me encantará saber de ti.</p></div><div className="contact-links reveal">{[{name:'WhatsApp',label:'+54 9 3834 604640',url:'https://wa.me/5493834604640',Icon:MessageCircle},{name:'Instagram',label:'@samusanchez07',url:'https://www.instagram.com/samusanchez07/',Icon:Instagram},{name:'LinkedIn',label:'Samuel Romano Sánchez',url:'https://www.linkedin.com/in/samuel-romano-s%C3%A1nchez-21574b449/',Icon:Linkedin},{name:'Correo electrónico',label:'sammrsanchez07@gmail.com',url:'mailto:sammrsanchez07@gmail.com',Icon:Mail}].map(({name,label,url,Icon}) => <a href={url} key={name} target={url.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"><Icon size={24}/><div><span>{name}</span><strong>{label}</strong></div><ArrowUpRight className="contact-arrow" size={23}/></a>)}</div></section>
    <footer><a href="#inicio" className="monogram" aria-label="Volver al inicio">sr<span>•</span></a><p>SAMUEL ROMANO SÁNCHEZ<br/><span>Diseño gráfico & edición de videos</span></p><a href="#inicio" className="back-top">Volver arriba <ArrowUp size={18}/></a></footer>
    <dialog ref={folderDialog} className="folder-dialog" aria-label={folder?.title} onClose={() => setFolder(null)} onClick={e => { if (e.target === e.currentTarget) folderDialog.current?.close() }}><button className="icon-button close-dialog" onClick={() => folderDialog.current?.close()} aria-label="Cerrar carpeta"><X/></button>{folder && <><p className="small-label">CARPETA</p><h2>{folder.title}</h2>{folder.pieces.length ? <div className="project-grid">{folder.pieces.map((p, i) => <button type="button" className="project" key={p.image} onClick={() => setViewer(p.gallery?.length ? { pieces: piecesOf(p), index: 0 } : { pieces: folder.pieces.flatMap(piecesOf), index: i })} aria-label={p.gallery?.length ? `Ver proyecto ${p.title}, ${p.gallery.length} imágenes` : `Ver ${p.title} ampliado`}><img src={thumb(p.image, 800)} srcSet={thumbSet(p.image)} sizes={thumbSizes} alt={p.alt} loading={i < EAGER_THUMBS ? 'eager' : 'lazy'} fetchPriority={i < 2 ? 'high' : 'auto'} decoding="async"/>{p.gallery?.length ? <span className="project-count">{p.gallery.length} imágenes</span> : null}<span>{p.title}<Plus/></span></button>)}</div> : <p className="folder-empty">Esta carpeta está preparada. Muy pronto se sumarán aquí los trabajos.</p>}</>}</dialog>
    <dialog ref={dialog} className="piece-dialog" aria-label={piece && viewer ? `${piece.title}, imagen ${viewer.index + 1} de ${viewer.pieces.length}` : 'Vista ampliada'} onClose={() => setViewer(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}><button className="icon-button close-dialog" onClick={() => dialog.current?.close()} aria-label="Cerrar imagen"><X/></button>{piece && viewer && <><div className="piece-stage"><button type="button" className="piece-arrow previous" onClick={() => showPiece(-1)} aria-label="Ver imagen anterior"><ChevronLeft size={26} strokeWidth={1.6}/></button><StageImage key={piece.image} piece={piece}/><button type="button" className="piece-arrow next" onClick={() => showPiece(1)} aria-label="Ver imagen siguiente"><ChevronRight size={26} strokeWidth={1.6}/></button></div><div className="piece-caption"><h2>{piece.title}</h2><span className="piece-count" aria-live="polite">{String(viewer.index + 1).padStart(2, '0')} / {String(viewer.pieces.length).padStart(2, '0')}</span></div>{piece.description && <p>{piece.description}</p>}</>}</dialog>
  </div>
}
function SectionLabel({number,label}: {number:string,label:string}) { return <div className="section-label"><span>{number} / {label}</span><div/><ArrowUpRight size={22}/></div> }

type VideoProject = (typeof videoProjects)[number]
const SKIP_SECONDS = 5
const formatTime = (seconds: number) => {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}
function VideoCard({video,index}: {video:VideoProject,index:number}) {
  const ref = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const label = `${video.title} · Video ${index+1}`
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    el.defaultMuted = true
    el.loop = true
    const play = () => { el.play().catch(() => { if (!el.muted) { el.muted = true; setSoundOn(false); el.play().catch(() => {}) } }) }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { if (!userPaused.current) play() } else if (!el.paused) el.pause() }, { threshold: .25 })
    observer.observe(el)
    const sync = () => setPlaying(!el.paused)
    const tick = () => setTime(el.currentTime)
    const meta = () => { setDuration(el.duration || 0); setTime(el.currentTime) }
    const volume = () => setSoundOn(!el.muted)
    el.addEventListener('play', sync); el.addEventListener('pause', sync); el.addEventListener('playing', sync)
    el.addEventListener('timeupdate', tick); el.addEventListener('seeked', tick)
    el.addEventListener('loadedmetadata', meta); el.addEventListener('durationchange', meta)
    el.addEventListener('volumechange', volume)
    if (el.readyState >= 1) meta()
    return () => {
      observer.disconnect()
      el.removeEventListener('play', sync); el.removeEventListener('pause', sync); el.removeEventListener('playing', sync)
      el.removeEventListener('timeupdate', tick); el.removeEventListener('seeked', tick)
      el.removeEventListener('loadedmetadata', meta); el.removeEventListener('durationchange', meta)
      el.removeEventListener('volumechange', volume)
    }
  }, [])
  const togglePlay = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) { userPaused.current = false; el.play().catch(() => { el.muted = true; el.play().catch(() => {}) }) }
    else { userPaused.current = true; el.pause() }
  }
  const toggleSound = () => {
    const el = ref.current
    if (!el) return
    el.muted = !el.muted
    if (!el.muted && el.paused && !userPaused.current) el.play().catch(() => { el.muted = true })
  }
  const seekTo = (value: number) => {
    const el = ref.current
    if (!el || !duration) return
    el.currentTime = Math.min(Math.max(value, 0), duration)
    setTime(el.currentTime)
  }
  const skip = (amount: number) => {
    const el = ref.current
    if (!el || !duration) return
    seekTo(el.currentTime + amount)
  }
  const progress = duration ? (time / duration) * 100 : 0
  return <article className="video-card reveal" style={{'--delay':`${(index%3)*90}ms`} as React.CSSProperties}><span className="video-number">0{index+1}</span><div className="video-frame"><video ref={ref} loop muted playsInline preload="metadata" poster={video.poster} aria-label={label} onClick={togglePlay}><source src={video.poster ? video.src : `${video.src}#t=0.1`} type="video/mp4"/>Tu navegador no admite la reproducción de este video.</video>
    <div className="video-controls" role="group" aria-label={`Controles de ${label}`}>
      <input type="range" className="video-progress" min={0} max={duration || 0} step={0.05} value={Math.min(time, duration || 0)} disabled={!duration} onChange={e => seekTo(Number(e.currentTarget.value))} style={{'--progress':`${progress}%`} as React.CSSProperties} aria-label={`Progreso de ${label}`} aria-valuetext={`${formatTime(time)} de ${formatTime(duration)}`}/>
      <div className="video-controls-row">
        <button type="button" className="video-control video-control-main" onClick={togglePlay} aria-label={playing ? `Pausar ${label}` : `Reproducir ${label}`}>{playing ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}</button>
        <button type="button" className="video-control" onClick={() => skip(-SKIP_SECONDS)} disabled={!duration} aria-label={`Retroceder ${SKIP_SECONDS} segundos en ${label}`}><RotateCcw size={15}/></button>
        <button type="button" className="video-control" onClick={() => skip(SKIP_SECONDS)} disabled={!duration} aria-label={`Adelantar ${SKIP_SECONDS} segundos en ${label}`}><RotateCw size={15}/></button>
        <span className="video-time" aria-hidden="true">{formatTime(time)} / {formatTime(duration)}</span>
        <button type="button" className="video-control sound-toggle" onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? `Silenciar ${label}` : `Activar sonido de ${label}`}>{soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button>
      </div>
    </div>
  </div><h3>{video.title}</h3></article>
}
