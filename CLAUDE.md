# CLAUDE.md — Arquitectura, Funcionalidades y Código

## 1. Estructura General del Proyecto

### Archivos principales
```
Portafolio Val/
├── index.html          # Estructura semántica completa
├── estilo.css          # Estilos globales + componentes
├── script.js           # Lógica interactiva
├── Img/                # Carpeta de imágenes (GIF, PNG, JPG)
└── audio/              # Archivos de sonido (click, etc.)
```

### Sections principales en HTML
```html
<section class="portada" id="inicio">
<section class="sobre-mi" id="sobre-mi">
<section class="proyectos" id="proyectos">
<section class="galeria-trabajos" id="galeria">
<section class="soundtrack-section" id="soundtrack">
<section class="servicios" id="servicios">
<section class="contacto-retro" id="contacto">
```

---

## 2. Arquitectura de Componentes

### Header/Navegación
**Archivo**: `index.html` (línea 295-318)
**Clase**: `.encabezado`
**Funcionalidad**: 
- Logo clickeable vuelve al inicio
- Navegación en link con efectos hover
- Menú móvil preparado (clase `.menu-movil`)

**Detalles CSS**:
- Altura: `76px` mínima
- Posición: `position: relative; z-index: 20`
- Flexbox con `space-between`
- Links tienen subrayado animado en hover

---

### Portada (Hero Section)
**Archivo**: `index.html` (línea 325-380)
**Clases**: `.portada`, `.texto-portada`, `.composicion`, `.carnet-rosa`

**Elementos principales**:
1. **Grid de fondo decorativo** (`.portada-grid`)
   - Líneas rosa semitransparentes
   - Mask gradient hacia la derecha

2. **Texto a la izquierda** (`.texto-portada`)
   - Saludo: "DISEÑADORA GRÁFICA · CREADORA VISUAL"
   - H1 con palabra en cursiva animada (`.palabra-cursiva`)
   - Descripción y botón CTA

3. **Carnet rosado a la derecha** (`.composicion`)
   - Foto con marco y sombra
   - Elementos decorativos: estrellas, boleto, sello
   - Animación de respiración (hover effect)
   - GIF animado del portafolio personal

**Animaciones**:
- `.palabra-cursiva`: `palabraBaila` (4s)
- `.foto-marco`: `fotoRespira` (6s)
- Estrellas: `girarSello` (15s)

---

### Sección Sobre Mí
**Archivo**: `index.html` (línea 489-575)
**Clase**: `.sobre-mi`

**Contenido**:
- Imagen: cámara rosa retro (imagen PNG)
- Biografía en párrafo
- **Skills con barras de progreso** (`.skills-porcentajes`)
  - Illustrator: 95%
  - Photoshop: 90%
  - Figma: 82%
  - InDesign: 80%
  - After Effects: 75%
  - CapCut: 88%
  - Lightroom: 78%

**Estructura HTML**:
```html
<div class="skill-item">
  <div class="skill-head">
    <span>Illustrator</span>
    <strong>95%</strong>
  </div>
  <div class="skill-bar"><span style="width: 95%"></span></div>
</div>
```

---

### Archivo Creativo (Carpetas de Proyectos)
**Archivo**: `index.html` (línea 581-731)
**Clase**: `.proyectos`

**Funcionalidad principal**: Filtrado de carpetas + Modal

**Filtros** (`.filtros-carpetas`):
- TODOS (por defecto activo)
- BRANDING
- PACKAGING
- EDITORIAL
- PUBLICIDAD

**Carpetas** (`.carpeta`):
1. **Mágara** — Branding (fondo verde `#145a39`)
2. **Amano** — Packaging (fondo amarillo `#efcc33`)
3. **Otra mirada** — Editorial (fondo gris oscuro)
4. **Hazte ver** — Publicidad (fondo rosa)

**JavaScript funcionalidad** (`script.js`, línea 17-56):
```javascript
// Escuchar clicks en filtros
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", function() {
    const filtro = boton.dataset.filtro;
    // Toggle clase "activo" y "oculta"
    // Refrescar animaciones ScrollTrigger si existen
  });
});
```

**Data attributes usado**:
- `data-filtro="branding|packaging|editorial|publicidad"`
- `data-categoria="branding|packaging|editorial|publicidad"`
- `data-proyecto="magara|amano|grafico|publicidad"`

---

### Modal de Proyecto (Hoja Editorial)
**Archivo**: `index.html` (línea 737-778)
**Etiqueta HTML**: `<dialog id="hojaProyecto" class="hoja-proyecto">`

**Estructura**:
```html
<dialog id="hojaProyecto">
  <div class="hoja-cabecera">
    <span id="categoriaHojaProyecto"></span>
    <button id="cerrarHojaProyecto">✕ CERRAR</button>
  </div>
  
  <div class="hoja-contenido">
    <p class="hoja-etiqueta"></p>
    <h2 id="tituloHojaProyecto"></h2>
    <p id="descripcionHojaProyecto"></p>
    <div id="imagenesHojaProyecto" class="hoja-galeria"></div>
    <div class="hoja-informacion">
      <h3>Detrás de la idea.</h3>
      <p id="textoHojaProyecto"></p>
    </div>
  </div>
  
  <div class="hoja-pie">
    <button id="cerrarHojaAbajo">CERRAR ARCHIVO ↑</button>
  </div>
</dialog>
```

**Data de proyectos** (`script.js`, línea 113-187):
```javascript
const proyectos = {
  magara: {
    titulo: "Mágara.",
    categoria: "01 / BRANDING",
    descripcion: "Identidad visual · Caribe colombiano",
    texto: "...",
    imagenes: [{ src: "...", nombre: "..." }]
  },
  // ... más proyectos
};
```

**JavaScript funcionalidad** (`script.js`, línea 223-284):
- `abrirProyecto(id)`: Rellena modal con datos
- Escuchadores en `.carpeta-enlace`
- Cierre con Escape y click fuera (nativo de `<dialog>`)

---

### Galería Visual (Abanico Y2K)
**Archivo**: `index.html` (línea 784-871)
**Clase**: `.galeria-trabajos`

**Elementos visuales**:
- Portada con "VISTO DE CERCA"
- **Abanico de fotos** (`.galeria-abanico`)
  - 4 figuras con fotos de proyectos
  - Efecto de abanico con transform 3D
- **Círculo inferior** (`.galeria-disco`)
  - "VR® CREATIVE PORTFOLIO"

**Interactividad**:
- Click en foto abre visor completo (`.visor-galeria`)
- Visor es un `<dialog>` con imagen ampliada

**JavaScript funcionalidad** (`script.js`, línea 565-628):
- Selecciona elementos del visor
- Abre modal al clickear foto o presionar Enter/Space
- Cierra con click fuera o botón

---

### Sección Soundtrack (Grabadora + Spotify)
**Archivo**: `index.html` (línea 886-950)
**Clase**: `.soundtrack-section`

**Contenido**:
- **Izquierda**: Imagen grabadora rosa (`.boombox-img`)
- **Derecha**: 
  - Texto descriptivo
  - **Spotify embed**: `<iframe>` directo
  - Etiqueta "VR® MIXTAPE / SIDE A ♡"

**Nota**: Spotify es un embed externo, no hay reproductor custom aquí

---

### Sección Servicios
**Archivo**: `index.html` (línea 961-1080)
**Clase**: `.servicios`

**Fondo**: Oscuro (`#191717`)
**Color de texto**: Blanco

**Servicios** (`.lista-servicios`):
Usando `<details>` nativo para acordeón:

1. Branding e identidad visual
2. Diseño para redes sociales
3. Publicidad y material POP
4. Contenido audiovisual
5. Ilustración y diseño editorial

**Estructura HTML**:
```html
<details class="servicio-acordeon">
  <summary>
    <span class="servicio-numero">01</span>
    <div class="servicio-info">
      <h3>Título</h3>
      <p>Descripción breve</p>
    </div>
    <span class="servicio-toggle"></span>
  </summary>
  <div class="servicio-desplegable">
    <p>Descripción completa...</p>
  </div>
</details>
```

---

### Sección Contacto (Formulario Nokia)
**Archivo**: `index.html` (línea 1087-1226)
**Clase**: `.contacto-retro`

**Elemento principal**: 
- Teléfono retro estilo Nokia 3310 simulado con CSS
- Formulario incrustado en la pantalla del "teléfono"

**Estructura del formulario**:
```html
<form class="telefono-retro-form">
  <h3>NUEVO MENSAJE ♡</h3>
  <label for="retroNombre">Nombre</label>
  <input type="text" id="retroNombre" name="nombre" placeholder="Tu nombre">
  <!-- ... más campos -->
  <button type="submit">ENVIAR ↗</button>
</form>
```

**Campos del formulario**:
- Nombre (text)
- Correo (email)
- Asunto (text)
- Mensaje (textarea)

**Detalles visuales**:
- Pantalla: `#f5f5f5` con borde
- Teclado numérico decorativo (solo visual, no funcional)
- Botones de navegación N/S/E/O decorativos
- Status bar ficticio (11:11, @valentina, señal)

**CSS para Nokia** (`index.html`, línea 36-287 + estilo.css):
- `.telefono-retro`: contenedor principal
- `.telefono-retro-screen`: pantalla del formulario
- `.telefono-retro-controls`: teclado decorativo
- Bordes y esquinas características de Nokia

---

## 3. Funcionalidad JavaScript

### Archivo principal: `script.js`

#### Patrón de organización
```javascript
(function () {
  "use strict";
  
  function iniciarPortafolio() {
    // Toda la lógica aquí
  }
  
  // Ejecutar al cargar DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarPortafolio, { once: true });
  } else {
    iniciarPortafolio();
  }
})();
```

**Ventajas**:
- IIFE previene contaminación de scope global
- "use strict" habilita modo estricto
- Event listener con `{ once: true }` evita ejecución múltiple

---

### Funcionalidad 1: Filtros de Carpetas

**Código**: `script.js`, línea 14-56

**Lógica**:
1. Selecciona todos los botones filtro (`.filtro-carpeta`)
2. Selecciona todas las carpetas (`.archivador .carpeta`)
3. Al clickear un filtro:
   - Marca botón como activo (añade clase `.activo`)
   - Actualiza `aria-pressed`
   - Filtra carpetas: añade clase `.oculta` a las que no coinciden
   - Refrescar ScrollTrigger si GSAP existe

**Comportamiento**:
```javascript
const filtro = boton.dataset.filtro; // "todos", "branding", etc.
const mostrar = filtro === "todos" || carpeta.dataset.categoria === filtro;
carpeta.classList.toggle("oculta", !mostrar);
```

---

### Funcionalidad 2: Galería (Flechas de desplazamiento)

**Código**: `script.js`, línea 61-107

**Elementos necesarios** (IDs):
- `galeriaCarrusel` - contenedor scroll
- `galeriaAnterior` - botón anterior
- `galeriaSiguiente` - botón siguiente

**Lógica**:
```javascript
function moverGaleria(direccion) {
  const pieza = galeria.querySelector(".pieza");
  const espacio = parseFloat(getComputedStyle(galeria).columnGap) || 20;
  const distancia = pieza.getBoundingClientRect().width + espacio;
  
  galeria.scrollBy({
    left: direccion * distancia,
    behavior: "smooth"
  });
}
```

**Nota**: Los elementos con IDs no existen en el HTML actual, por lo que esta funcionalidad está preparada pero desactivada

---

### Funcionalidad 3: Modal de Proyectos

**Código**: `script.js`, línea 113-315

#### 3.1 Data estructura de proyectos
```javascript
const proyectos = {
  magara: { titulo, categoria, descripcion, texto, imagenes },
  amano: { ... },
  grafico: { ... },
  publicidad: { ... }
};
```

#### 3.2 Función abrirProyecto(id)
```javascript
function abrirProyecto(id) {
  const proyecto = proyectos[id];
  
  // Rellenar textos
  tituloModal.textContent = proyecto.titulo;
  categoriaModal.textContent = proyecto.categoria;
  // ... más textos
  
  // Generar imágenes dinámicamente
  proyecto.imagenes.forEach(imagen => {
    const figura = document.createElement("figure");
    const foto = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    
    foto.src = imagen.src;
    foto.alt = imagen.nombre;
    figura.appendChild(foto);
    figura.appendChild(figcaption);
    galeriaModal.appendChild(figura);
  });
  
  // Abrir modal (elemento <dialog>)
  if (!modal.open) {
    modal.showModal();
  }
  modal.scrollTop = 0;
}
```

#### 3.3 Event listeners en carpetas
```javascript
document.querySelectorAll(".archivador .carpeta-enlace").forEach(enlace => {
  enlace.addEventListener("click", function(evento) {
    evento.preventDefault();
    
    const id = enlace.dataset.proyecto || rutas[enlace.getAttribute("href")];
    abrirProyecto(id);
  });
});
```

#### 3.4 Cerrar modal
- Botones: `#cerrarHojaProyecto` y `#cerrarHojaAbajo`
- Automático: Escape key (nativo de `<dialog>`)
- Click fuera: implementado con `event.target`

---

### Funcionalidad 4: Reproductor Musical Y2K

**Código**: `script.js`, línea 400-532

**Nota**: Este código está preparado pero requiere elementos HTML que no están en el HTML actual

**Estructura esperada**:
```html
<div id="audioPlayer"></div>
<button id="playBtn">▶</button>
<div class="cassette-track" data-src="..." data-title="..."></div>
```

**Funcionalidades si existieran**:
- Play/Pause
- Anterior/Siguiente
- Progress bar
- Tiempo actual/Duración
- Autoplay siguiente pista

---

### Funcionalidad 5: Sonido al abrir carpetas

**Código**: `script.js`, línea 534-559

**Lógica**:
```javascript
const sonido = new Audio("audio/photos-click-409642.mp3");
sonido.volume = 0.6;
sonido.playbackRate = 1.8; // Aumenta velocidad

document.querySelectorAll(".carpeta-enlace").forEach(carpeta => {
  carpeta.addEventListener("click", () => {
    sonido.pause();
    sonido.currentTime = 0;
    sonido.play().catch(error => {
      console.error("Error al reproducir:", error);
    });
  });
});
```

**Archivo de sonido**: `audio/photos-click-409642.mp3`
**Velocidad**: 1.8x (más rápido y agudo)
**Volumen**: 0.6 (60% del máximo)

---

### Funcionalidad 6: Visor de Fotografías

**Código**: `script.js`, línea 565-628

**Elementos HTML**:
```html
<dialog id="visorGaleria" class="visor-galeria">
  <button id="cerrarVisorGaleria">✕</button>
  <img id="imagenVisorGaleria" src="" alt="">
  <p id="tituloVisorGaleria"></p>
</dialog>
```

**Evento**:
- Selecciona fotos en `#galeria .abanico-foto`
- Al clickear o presionar Enter/Space:
  - Obtiene imagen y título
  - Abre modal
  - Muestra imagen ampliada

**Cierre**:
- Botón cerrar explícito
- Click fuera (implementado)
- No tiene Escape automático (podría añadirse)

---

## 4. Flujo de Interacción

### Flujo usuario típico

1. **Llega a portada**
   - Ve animaciones de fondo
   - Lee saludo y título animado
   - Ve foto del carnet rosado
   - Puede hacer hover para ver efectos

2. **Navega a Archivo**
   - Ve 4 carpetas apiladas
   - Puede filtrar por categoría
   - Al hacer hover en carpeta: sube, se destaca, muestra "ABRIR ARCHIVO ↗"
   - Escucha sonido click al clickear

3. **Abre un proyecto**
   - Modal se abre con animación
   - Muestra título, descripción, imagen
   - Lee "Detrás de la idea"
   - Puede cerrar con botón, Escape o click fuera

4. **Explora Galería**
   - Ve fotos en abanico
   - Click en foto abre visor completo
   - Puede ver imagen ampliada

5. **Ve Soundtrack**
   - Spotify player embebido
   - Botones de control están visibles

6. **Lee Servicios**
   - Ve 5 servicios en acordeón
   - Expande al clickear para ver detalles

7. **Contacta**
   - Ve teléfono retro
   - Rellena formulario en pantalla del "Nokia"
   - Envía mensaje

---

## 5. Consideraciones de Código

### Accesibilidad
- Todos los modales usan `<dialog>` nativo
- Botones tienen `aria-label`
- Carpetas tienen data attributes para semántica
- Focus visible en elementos interactivos
- Navegar con teclado funciona completamente

### Performance
- Lazy loading en imágenes modales
- IIFE para scope aislado
- Event listeners reutilizados donde es posible
- Queryselector al inicio (no en loop)

### Responsive
- CSS clamp() para escalas adaptativas
- Media queries en 600px y 900px
- Flex/Grid layouts fluidos
- Unidades relativas (vw, em)

### Validación
- Comprobar existencia de elementos antes de usar
- Try/catch en reproducción de audio
- Validación de estructura de datos

---

## 6. Posibles Mejoras Futuras

1. **Formulario de contacto funcional**
   - Conectar a servidor backend
   - Validación de campos
   - Envío real de emails

2. **Reproductor musical personalizado**
   - Si se desea usar audio local en lugar de Spotify

3. **Animaciones GSAP avanzadas**
   - ScrollTrigger para paralax
   - Timeline animations

4. **Analytics**
   - Trackear clicks en proyectos
   - Ver qué secciones se visitan más

5. **Dark mode**
   - Toggle tema oscuro/claro
   - Persistir preferencia en localStorage

6. **Internacionalización**
   - Versión en inglés
   - Detectar idioma del navegador

---

## 7. Dependencias Externas

### Google Fonts
- DM Sans (400-900 weights)
- Playfair Display (700 italic)
- **URL**: `https://fonts.googleapis.com/css2?family=...`

### Spotify
- Embed iframe oficial
- **URL**: `https://open.spotify.com/embed/playlist/...`

### Audio
- Sonido click: `audio/photos-click-409642.mp3`
- **Formato**: MP3 estándar
- **Tamaño**: pequeño (click sound)

### Imágenes
- GIF animado: `Img/Pink White Playful Collage Creative Team Profile Instagram Post.gif`
- Fotos PNG/JPG en carpeta `Img/`

### JavaScript
- **Sin dependencias externas** en script.js principal
- ScrollTrigger (GSAP) es opcional si está en página

---

## 8. Patrones de Desarrollo

### Pattern: Módulo IIFE
```javascript
(function() {
  "use strict";
  function init() { /* código */ }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
```

### Pattern: Data-driven rendering
```javascript
const data = { /* estructura */ };
function render(id) {
  const item = data[id];
  element.textContent = item.title;
  // actualizar DOM
}
```

### Pattern: Event delegation (cuando sea necesario)
```javascript
parent.addEventListener("click", (e) => {
  if (e.target.matches(".selector")) {
    // Manejar
  }
});
```

### Pattern: Feature detection
```javascript
if (typeof ScrollTrigger !== "undefined") {
  ScrollTrigger.refresh();
}
```

---

## Resumen de Archivos Clave

| Archivo | Líneas | Propósito | Cambios frecuentes |
|---------|--------|----------|-------------------|
| `index.html` | ~1268 | Estructura semántica | Contenido proyectos, texto |
| `estilo.css` | ~2953 | Estilos + componentes | Colores, tamaños, animaciones |
| `script.js` | ~629 | Lógica interactiva | Eventos, datos proyectos |
| `DESIGN.md` | Este doc | Tokens de diseño | Paleta, tipografía |
| `CLAUDE.md` | Este doc | Arquitectura código | Documentación |

