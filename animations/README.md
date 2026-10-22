# Animaciones de entrada

Estas animaciones revelan cada elemento una sola vez. Si el elemento está visible al abrir o recargar la página, se anima al cargar. Los demás se animan cuando aparecen al hacer scroll.

## Cómo usarlas

1. Confirma que `index.html` incluya `reveal.css` y `reveal.js`:

```html
<link rel="stylesheet" href="animations/reveal.css">
<script src="animations/reveal.js" defer></script>
```

2. Añade `data-reveal` al contenedor que quieras animar:

```html
<section data-reveal="left">
  Contenido de la sección
</section>
```

3. Elige una dirección: `left`, `right`, `up`, `down` o `fade`.

4. Para escalonar varios elementos, añade una demora en milisegundos:

```html
<article data-reveal="up" data-reveal-delay="60">...</article>
<article data-reveal="up" data-reveal-delay="120">...</article>
```

La demora máxima es de 240 ms. En móviles el recorrido es más corto y, si el usuario prefiere movimiento reducido, solo se aplica un fundido suave.
