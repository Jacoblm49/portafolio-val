# DESIGN.md — Sistema de Diseño y Tokens

## Paleta de Colores

### Colores Primarios
- **Fondo base**: `#fff2f3` (rosa muy claro, se usa como fondo general)
- **Rosa principal**: `#f276b6` (color corporativo, interacciones)
- **Negro texto**: `#171515` (oscuro principal para texto)
- **Blanco puro**: `#fffdfb` (blanco cálido para fondos)

### Colores Secundarios
- **Vino/Burgundy**: `#851c2b` (acentos, selecciones, botones primarios)
- **Rosa claro**: `#ffc4df` (variación clara del rosa)
- **Rosa medio**: `#e9a0c0` (decoraciones, bordes)
- **Gris texto**: `#77716f` (texto secundario)

### Colores de Sección (Project Cards)
- **Mágara (Branding)**: fondo `#145a39` (verde), texto `#fff9e9`
- **Amano (Packaging)**: fondo `#efcc33` (amarillo), texto `#274653`
- **Editorial**: fondo `#191717` (gris oscuro), texto `#fff0f5`
- **Publicidad**: fondo `#f4a7cd` (rosa pastel), texto `#f8f4e9` o `var(--vino)`

### Colores Complementarios (Decoración)
- **Fondo modalidades**: `#f5b6d5`, `#ffe0ec`, `#f7c4dc`
- **Nokia retro**: `#f5f5f5` (pantalla), `#171515` (bordes)
- **Estrellas marquesina**: `#ea7ab3` (fondo), `#ffffff` (estrellas)

---

## Tipografías

### Fuentes principales
```css
--fuente: "DM Sans", sans-serif;  /* Body, navegación, UI */
--cursiva: "Playfair Display", serif;  /* Títulos cursivos, acentos */
```

### Importación
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
```

### Pesos disponibles
- **DM Sans**: 400, 500, 600, 700, 800, 900
- **Playfair Display**: 700 (italic)

### Uso recomendado
- **Headings (h1, h2, h3)**: DM Sans weight 900 o 800
- **Playfair Display**: Títulos grandes con énfasis, palabras en cursiva dentro de h2/h3
- **Body text**: DM Sans weight 400-500, line-height 1.7-1.9
- **Pequeño (labels, captions)**: DM Sans weight 700, font-size 9-11px

---

## Espaciado y Márgenes

### Variable CSS global
```css
--margen: clamp(22px, 6vw, 90px);  /* Padding lateral adaptativo */
```

### Espaciado de secciones
- **Entre secciones**: `110px` vertical (puede variar según contexto)
- **Interior de secciones**: `var(--margen)` (22-90px horizontal)
- **Gap en grid layouts**: `clamp(35px, 8vw, 120px)` o similar

### Gaps comunes en componentes
- **Flex/Grid gaps**: 8px a 50px según densidad
- **Border radius**: 0px (mayoría), 2px (modales), 8-20px (decorativo)

---

## Tamaños de Fuente (Escala Tipográfica)

### Headings
- **h1**: `clamp(70px, 9vw, 132px)` (portada)
- **h2 (secciones)**: `clamp(42px, 7vw, 88px)` general
- **h3**: varía según contexto

### Texto secundario
- **Etiquetas/números secciones**: `10px` weight 700
- **Descripción grande**: `12-14px` weight 500
- **Cuerpo**: `13-14px` weight 400-500
- **Small/captions**: `9-11px` weight 700

### Responsive
- Mobile (< 600px): escalas reducen a `clamp(45px, 12vw, 75px)` para h1/h2
- Tablet (600-900px): interpolación suave entre mobile y desktop

---

## Animaciones

### Animaciones clave del portafolio

#### 1. Títulos y elementos flotantes
```css
@keyframes palabraBaila {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-8px); }
}
```
- Duración: `4s`
- Timing: `ease-in-out infinite`
- Aplicado a: `.palabra-cursiva` en portada

#### 2. Rotación de estrellas
```css
@keyframes girarSello {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
```
- Duración: `15s` (estrellas decorativas), `18s` (sello grande)
- Timing: `linear infinite`
- Se pausa en hover

#### 3. Respiración del carnet/foto
```css
@keyframes fotoRespira {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
```
- Duración: `6s`
- Timing: `ease-in-out infinite`
- Aplicado a: `.foto-marco`, `.carnet-rosa`

#### 4. Marquesina de estrellas
```css
@keyframes desplazarEstrellas {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```
- Duración: `20s`
- Timing: `linear infinite`
- Genera efecto de cinta sin fin

#### 5. Transiciones suaves (no animaciones)
- Hover effects: `0.25s - 0.45s ease`
- Cambios de z-index/transform: `cubic-bezier(.2,.8,.2,1)` para flujo suave
- Enlaces nav: `width 0.3s ease`

### Desactivación de movimiento
```css
@media (prefers-reduced-motion: reduce) {
  *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## Componentes Visuales Clave

### Carnet Rosado (`.carnet-rosa`)
- **Fondo**: `#ffc4df`
- **Border**: `2px solid #e9a0c0`
- **Box-shadow**: `0 0 0 5px var(--blanco), 12px 14px 0 var(--rosa)`
- **Rotación**: `-3deg` por defecto
- **Transform en hover**: `rotate(0deg) translateY(-5px)`
- Elementos decorativos: estrellas, boleto con puntada, sello rosado

### Carpetas del Archivador
- **Estructura**: posición absoluta apilada con transform
- **Rotaciones**: -5deg, 4deg, -2deg, 5deg (cada una)
- **Z-index**: 1-4 en reposo, 10 en hover
- **Box-shadow**: `0 14px 30px #0002`
- **Hover effect**: `translate(0, -35px) rotate(0deg) scale(1.04)`

### Modal de Proyecto (`.hoja-proyecto`)
- **Ancho**: `min(950px, calc(100% - 30px))`
- **Background**: `#fffdfb` (blanco cálido)
- **Border**: `2px solid #171515`
- **Box-shadow**: `12px 12px 0 #f276b6` (sombra rosa)
- **Max-height**: `90vh` / `90dvh`
- **Backdrop**: `rgba(10, 8, 10, 0.78)` con `blur(5px)`

### Formulario Nokia Retro
- **Pantalla**: `#f5f5f5` con bordes `#171515`
- **Inputs**: `border: 1px solid #171515`, `border-radius: 0`
- **Botón envío**: fondo `#f276b6`, hover `#f8c8df`
- **Focus**: `outline: 2px solid #f276b6`
- **Tipografía pequeña**: 9-11px

### Filtros de Carpetas
- **Botón inactivo**: `border: 1px solid #665d5d`, fondo `transparent`
- **Botón activo**: `background: var(--rosa)`, `color: #191717`
- **Transición**: `all 0.25s ease`

---

## Gradientes y Patrones

### Fondo con grilla
```css
background-image:
    linear-gradient(rgba(220, 104, 143, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(220, 104, 143, 0.15) 1px, transparent 1px);
background-size: 42px 42px;
```

### Patrón de puntos decorativo
```css
background-image:
    linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(90deg, #ffffff 1px, transparent 1px);
background-size: 30px 30px;
opacity: 0.14;
```

### Bordes ondulados (Carnet papel)
```css
background-image:
    radial-gradient(circle at 0 12px, var(--rosa-claro) 9px, transparent 9.5px),
    radial-gradient(circle at 100% 12px, var(--rosa-claro) 9px, transparent 9.5px),
    radial-gradient(circle at 12px 0, var(--rosa-claro) 9px, transparent 9.5px),
    radial-gradient(circle at 12px 100%, var(--rosa-claro) 9px, transparent 9.5px);
```

---

## Breakpoints Responsivos

### Puntos de quiebre
- **Desktop**: > 900px
- **Tablet**: 600px - 900px
- **Mobile**: < 600px

### Cambios principales por breakpoint

#### Tablet (max-width: 900px)
- Grid layouts pasan de 2 columnas a 1
- Composición fotográfica se ajusta
- Tamaños de fuente se reducen ligeramente

#### Mobile (max-width: 600px)
- `--margen` se fija a `22px`
- Encabezado altura reducida a `65px`
- Portada apilada (texto encima, foto abajo)
- Grid carrusel: `82%` de ancho
- Modales: ancho `calc(100% - 22px)`
- Font-sizes: máximos más pequeños

---

## Accesibilidad

### Focus states
```css
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--vino);
  outline-offset: 5px;
}
```

### Contraste de color
- Texto oscuro sobre fondo claro: WCAG AAA
- Rosa principal `#f276b6` sobre blanco: WCAG AA
- Vino `#851c2b` sobre fondo rosa claro: WCAG AAA

### Aria labels y roles
- Navegación: `aria-label="Navegación principal"`
- Botones modal: `aria-label="Cerrar proyecto"`
- Caretas decorativas: `aria-hidden="true"`
- Elementos interactivos: `role="button"` cuando es necesario

### Scroll padding
```css
html {
  scroll-padding-top: 90px;  /* Espacio para header fijo */
}
```

---

## Convenciones de Clase CSS

### Metodología
- **BEM**: `.bloque__elemento--modificador` (parcialmente)
- **Clases funcionales**: `.activo`, `.oculta`, `.open`
- **Prefijos de sección**: `.portada-`, `.sobre-mi-`, `.proyecto-`, etc.

### Nomenclatura común
- `.seccion` - contenedor de sección principal
- `.numero` - numeración de sección
- `.carpeta` - elemento de carpeta
- `.modal-`, `.hoja-` - elementos de modal
- `.carnet-`, `.foto-` - elementos decorativos

---

## Performance y Optimización

### Lazy loading
- Imágenes en carruseles: `loading="lazy"`
- Modal: imágenes solo se cargan al abrir

### Animations optimization
```css
will-change: transform;  /* Para marquesina */
animation: nombreAnimacion 20s linear infinite;
```

### Scroll snap
```css
scroll-snap-type: x mandatory;
scroll-snap-align: start;
scroll-behavior: smooth;
```

---

## Resumen de Tokens Reutilizables

| Token | Valor |
|-------|-------|
| Color primario | `#f276b6` |
| Color oscuro | `#171515` |
| Tipografía base | DM Sans |
| Tipografía énfasis | Playfair Display |
| Espaciado base | `--margen` (clamp) |
| Radio borde | 0-20px |
| Transición rápida | 0.25s-0.3s |
| Transición lenta | 0.45s-0.5s |
| Breakpoint tablet | 900px |
| Breakpoint mobile | 600px |
