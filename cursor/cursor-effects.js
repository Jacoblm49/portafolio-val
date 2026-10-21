// Efectos del cursor: estrellas y ripples
(function () {
  "use strict";

  function inicializarEfectosCursor() {
    const cursorCustom = document.getElementById("cursor-custom");
    if (!cursorCustom) return;

    // ====== ESTELAS DE ESTRELLAS ======
    const contenedorEstrellas = document.createElement("div");
    contenedorEstrellas.id = "cursor-estrellas-contenedor";
    contenedorEstrellas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483646;
    `;
    document.body.appendChild(contenedorEstrellas);

    let ultimoX = 0;
    let ultimoY = 0;
    let contadorParticulas = 0;

    function crearEstrella(x, y) {
      const estrella = document.createElement("div");
      const tamaño = Math.random() * 10 + 8; // 8-18px
      const duracion = Math.random() * 0.6 + 0.4; // 0.4-1s

      estrella.innerHTML = "★";
      estrella.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${tamaño}px;
        color: #f276b6;
        pointer-events: none;
        opacity: 0.9;
        transform: translate(-50%, -50%);
        animation: desvanecerEstrella ${duracion}s ease-out forwards;
      `;

      contenedorEstrellas.appendChild(estrella);

      setTimeout(() => {
        estrella.remove();
      }, duracion * 1000);
    }

    // Escuchar movimiento del mouse
    document.addEventListener("mousemove", (e) => {
      const distancia = Math.hypot(e.clientX - ultimoX, e.clientY - ultimoY);

      // Crear estrella cada 25px de movimiento (más separadas)
      if (distancia > 25) {
        crearEstrella(e.clientX, e.clientY);
        ultimoX = e.clientX;
        ultimoY = e.clientY;
      }
    });

    // ====== ONDAS RIPPLE ======
    function crearRipple(x, y) {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 40px;
        height: 40px;
        border: 2px solid #f276b6;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        opacity: 0.6;
        animation: expandirRipple 0.8s ease-out forwards;
      `;

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    }

    // Crear ripple al click
    document.addEventListener("click", (e) => {
      crearRipple(e.clientX, e.clientY);
    });

    // Crear ripple al hover en interactivos
    const elementosInteractivos = document.querySelectorAll(
      "a, button, input, select, textarea, summary, [role='button'], [role='menuitem'], .carpeta-enlace, .carpeta-enlace-texto"
    );

    elementosInteractivos.forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        crearRipple(e.clientX, e.clientY);
      });
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarEfectosCursor, {
      once: true,
    });
  } else {
    inicializarEfectosCursor();
  }
})();
