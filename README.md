# 📎 Portafolio Creativo — Valentina Rodríguez Díaz

Un portafolio visual creativo y experimental construido con **HTML**, **CSS** y **JavaScript vanilla**. Diseñado para presentar trabajos de diseño gráfico con una estética retro-futurista y elementos interactivos únicos.

---

## 👤 Acerca del Portafolio

**Nombre**: Valentina Rodríguez Díaz  
**Profesión**: Diseñadora Gráfica  
**Especialidades**: Branding, Packaging, Editorial, Publicidad  
**Año**: 2026

### Descripción
Portafolio digital de una diseñadora gráfica que busca comunicar su creatividad, personalidad y enfoque visual único. Cada sección del portafolio ha sido diseñada como una experiencia interactiva que refleja la identidad y estilo creativo de la autora.

---

## 🎨 Características Principales

### 1. **Portada con Animaciones** 
- Título principal con palabra animada en cursiva
- Carnet rosa decorativo con elementos interactivos (estrellas, boleto, sello)
- Grilla de fondo subtle
- Efecto respiración en la imagen protagonista

### 2. **Archivo Creativo** 
- 4 carpetas interactivas (Branding, Packaging, Editorial, Publicidad)
- Sistema de filtros por categoría
- Efecto apilado 3D que se destaca al hover
- Sonido click al abrir proyectos
- Modal editorial para cada proyecto

### 3. **Galería Visual**
- Abanico de fotos con efecto 3D
- Visor de imagen ampliada
- Fotos de 4 proyectos principales

### 4. **Sección Sobre Mí**
- Biografía profesional
- 7 skills con barras de progreso
- Imagen de cámara rosa decorativa

### 5. **Soundtrack Creativo**
- Embed de Spotify playlist
- Texto descriptivo
- Imagen de grabadora rosa retro

### 6. **Servicios**
- 5 servicios en acordeón nativo (`<details>`)
- Descripción completa al expandir
- Fondo oscuro para contraste

### 7. **Contacto**
- Formulario simulado en teléfono retro estilo Nokia
- Diseño nostálgico años 2000
- Campos: nombre, correo, asunto, mensaje
- Teclado numérico decorativo

### 8. **Interactividad Completa**
- Navegación suave entre secciones
- Modales con `<dialog>` nativo
- Efectos hover en todos los elementos clicables
- Responsivo en mobile, tablet y desktop

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Semántica, `<dialog>`, data attributes
- **CSS3**: Grid, Flexbox, custom properties, animaciones
- **JavaScript vanilla**: Sin frameworks ni librerías (excepto dependencia opcional GSAP)

### Tipografía
- **DM Sans** (Google Fonts): Body, UI, headings
- **Playfair Display** (Google Fonts): Acentos, cursiva

### Imágenes y Media
- **GIF animado** del portafolio (portada)
- **PNG/JPG** de proyectos (carpetas, galería)
- **MP3** sonido click (fotos-click-409642.mp3)
- **Spotify embed** iframe (playlist oficial)

---

## 📂 Estructura de Archivos

```
Portafolio Val/
├── index.html              # Estructura semántica completa (~1268 líneas)
├── estilo.css              # Estilos, componentes, animaciones (~2953 líneas)
├── script.js               # Lógica interactiva (~629 líneas)
├── DESIGN.md               # Sistema de diseño y tokens
├── CLAUDE.md               # Arquitectura y funcionalidades
├── README.md               # Este archivo
│
├── Img/                    # Carpeta de imágenes
│   ├── Pink White Playful Collage...gif  # GIF portada
│   ├── Camara.png                        # Cámara retro
│   ├── Cartel tropical Mágara...png      # Proyecto Mágara
│   ├── amano.jpeg                        # Proyecto Amano
│   ├── Revista Fraternos...png           # Proyecto Editorial
│   ├── publicidad-01.jpg                 # Proyecto Publicidad
│   ├── grabadora.png                     # Grabadora retro
│   └── ...otras imágenes
│
└── audio/                  # Carpeta de sonidos
    └── photos-click-409642.mp3           # Click sound
```

---

## 🚀 Cómo Usar

### Visualizar en navegador
1. Abre `index.html` en tu navegador
2. Navega usando:
   - Header: enlaces a cada sección
   - Scroll: desplazamiento suave entre secciones
   - Clickear elementos: abre modales, expande acordeones

### Editar contenido
- **Textos**: Edita directamente en `index.html`
- **Proyectos**: Modifica data en `script.js` (línea 113)
- **Colores**: Cambia variables CSS en `estilo.css` (línea 6)
- **Imágenes**: Reemplaza archivos en carpeta `Img/`

### Personalizar diseño
- Consulta **DESIGN.md** para paleta de colores, tipografía, espaciado
- Consulta **CLAUDE.md** para estructura de componentes y funcionalidad

---

## 🎯 Secciones y URLs

| Sección | Anchor | Descripción |
|---------|--------|-------------|
| Portada | `#inicio` | Hero con presentación principal |
| Sobre mí | `#sobre-mi` | Biografía y skills |
| Archivo | `#proyectos` | Carpetas de proyectos (filtrable) |
| Galería | `#galeria` | Fotos en abanico + visor |
| Soundtrack | `#soundtrack` | Spotify + grabadora retro |
| Servicios | `#servicios` | 5 servicios en acordeón |
| Contacto | `#contacto` | Formulario teléfono retro |

---

## 🎨 Paleta de Colores

| Uso | Color | Hex |
|-----|-------|-----|
| Primario | Rosa | `#f276b6` |
| Secundario | Vino | `#851c2b` |
| Fondo base | Rosa claro | `#fff2f3` |
| Texto | Negro | `#171515` |
| Acento | Blanco | `#fffdfb` |
| Proyecto 1 | Verde | `#145a39` |
| Proyecto 2 | Amarillo | `#efcc33` |
| Proyecto 3 | Gris oscuro | `#191717` |
| Proyecto 4 | Rosa pastel | `#f4a7cd` |

→ Ver **DESIGN.md** para paleta completa y tokens

---

## ⌨️ Funcionalidad JavaScript

### 1. Filtros de carpetas
- Clickear botón de categoría filtra proyectos
- Clase `.activo` marca seleccionado
- Clase `.oculta` oculta carpetas no coincidentes

### 2. Modal de proyectos
- `abrirProyecto(id)` rellena modal dinámicamente
- Cierra con botón, Escape o click fuera
- Imágenes se generan en tiempo real

### 3. Sonido interactivo
- Reproduce click al abrir carpeta
- Volumen 0.6, velocidad 1.8x

### 4. Visor de galería
- Amplifica foto del abanico
- Accesible por click o Enter/Space
- Cierra con botón o click fuera

### 5. Navegación suave
- Scroll-padding-top para header
- Scroll behavior: smooth

---

## 📱 Responsivo

### Breakpoints
- **Desktop**: > 900px — 2 columnas, tamaños grandes
- **Tablet**: 600px - 900px — 1 columna parcial, transición
- **Mobile**: < 600px — 1 columna, estilos comprimidos

### Características adaptables
- Márgenes: `clamp(22px, 6vw, 90px)`
- Tamaños de fuente: escalas fluidas con `clamp()`
- Grillas: transición de 2 a 1 columna
- Imágenes: `max-width: 100%`, responsive

---

## ♿ Accesibilidad

- ✅ HTML semántico (`<section>`, `<dialog>`, `<details>`)
- ✅ ARIA labels en botones y nav
- ✅ Focus visible con outline personalizado
- ✅ Contraste WCAG AAA en texto principal
- ✅ Navegación por teclado completa
- ✅ `prefers-reduced-motion` respetado
- ✅ Imágenes con `alt` descriptivo
- ✅ `role="button"` en elementos clicables

---

## 🔄 Flujo de Usuario Típico

```
1. Llega a portada
   ↓ (hover en carnet para efectos)
   ↓ (scroll o click "EXPLORAR")
   
2. Ve archivo con 4 carpetas
   ↓ (filtra por categoría)
   ↓ (clickea carpeta)
   
3. Se abre modal con proyecto
   ↓ (lee descripción e imágenes)
   ↓ (cierra)
   
4. Continúa scrolleando
   ↓ (galería → soundtrack → servicios)
   
5. Llega a contacto
   ↓ (rellena formulario simulado)
   ↓ (envía o abandona)
```

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas HTML | ~1268 |
| Líneas CSS | ~2953 |
| Líneas JavaScript | ~629 |
| Dependencias externas | 0 (solo Google Fonts + Spotify embed) |
| Animaciones CSS | 8+ keyframes |
| Eventos JavaScript | 50+ listeners |
| Imágenes | ~10 (Img/) |
| Archivos de audio | 1 (MP3) |
| Proyectos mostrados | 4 |
| Habilidades listadas | 7 |
| Servicios ofrecidos | 5 |

---

## 🎬 Animaciones Principales

1. **Palabra "ruido"** — Baila mientras flota (4s)
2. **Foto carnet** — Respira suavemente (6s)
3. **Estrellas decorativas** — Giran (15-18s)
4. **Marquesina estrellas** — Desplazamiento infinito (20s)
5. **Transiciones hover** — Suave (0.25-0.45s)
6. **Modal apertura** — Fade + scale (0.4s)

→ Ver **DESIGN.md** para keyframes completos

---

## 🐛 Debugging

### Console logs útiles
- Portafolio iniciado: filtros, galería y modal listos
- Errores de audio: si falla reproducción de sonido
- Elementos faltantes: si faltan elementos del modal

### Verificación de elementos
- Abre DevTools (F12)
- Busca elemento en inspector
- Verifica IDs y clases coincidan con JavaScript

### Responsive testing
- Abre DevTools → Device toolbar
- Prueba en mobile, tablet, desktop
- Verifica media queries en estilos

---

## 🔧 Posibles Mejoras Futuras

### Técnicas
- [ ] Conectar formulario a backend
- [ ] Agregar reproductor audio personalizado
- [ ] Implementar dark mode
- [ ] Añadir animaciones GSAP avanzadas
- [ ] Optimizar imágenes (WebP, srcset)
- [ ] Service worker para offline

### Funcionales
- [ ] Galería de más proyectos
- [ ] Blog de artículos/procesos
- [ ] Newsletter signup
- [ ] Testimonios de clientes
- [ ] Filtros avanzados (por técnica, año, etc.)
- [ ] Contador de visitas

### Contenido
- [ ] Versión en inglés (i18n)
- [ ] PDF descargable de CV
- [ ] Links a redes sociales
- [ ] Integración con Instagram Feed
- [ ] Case studies más detallados

---

## 📝 Documentación

Este proyecto incluye **3 documentos complementarios**:

1. **DESIGN.md**
   - Sistema de diseño completo
   - Paleta de colores y tokens
   - Tipografía y tamaños
   - Animaciones y transiciones
   - Componentes visuales
   - Breakpoints responsivos

2. **CLAUDE.md**
   - Arquitectura de componentes
   - Funcionalidad JavaScript detallada
   - Patrones de desarrollo
   - Consideraciones de código
   - Flujos de interacción

3. **README.md** (este archivo)
   - Contexto general del proyecto
   - Cómo usar y editar
   - Características principales
   - Stack tecnológico
   - Estructura de archivos

---

## 📧 Contacto

Para consultas o colaboraciones:
- **Email**: software@tecnosuper.com.co
- **Portafolio**: Abre `index.html` en navegador
- **Formulario**: Sección contacto (teléfono retro)

---

## © Créditos

- **Diseñadora**: Valentina Rodríguez Díaz
- **Código**: HTML5, CSS3, JavaScript Vanilla
- **Tipografía**: Google Fonts (DM Sans + Playfair Display)
- **Música**: Spotify (embed oficial)
- **Año**: 2026

---

## 📜 Licencia

Portafolio creativo de Valentina Rodríguez Díaz. Todos los derechos reservados.
El código está disponible para modificación personal y educativa.

---

**Última actualización**: 21 de octubre de 2026  
**Versión**: 1.0  
**Estado**: Completamente funcional

---

## 🎯 Quick Reference

### Editar contenido rápido
```html
<!-- Cambiar nombre portada -->
<h1>Ideas que<br />hacen<br /><span class="palabra-cursiva">ruido.</span></h1>

<!-- Añadir un proyecto nuevo -->
// En script.js objeto "proyectos" agregar:
nombreProyecto: { titulo, categoria, descripcion, texto, imagenes }
```

### Cambiar colores globales
```css
/* En estilo.css :root */
--rosa: #f276b6;           /* Color primario */
--vino: #851c2b;           /* Color secundario */
--fondo: #fff2f3;          /* Fondo base */
--negro: #171515;          /* Texto */
```

### Activar/desactivar animaciones
```css
/* Desactivar todas */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

---

¡Disfruta explorando el portafolio creativo! 🎨✨
