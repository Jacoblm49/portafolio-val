// Módulo cursor personalizado
(function () {
  "use strict";

  function inicializarCursorCustom() {
    const cursorCustom = document.getElementById("cursor-custom");

    if (!cursorCustom) {
      console.warn("Elemento #cursor-custom no encontrado");
      return;
    }

    // Sin top layer, conservar el cursor nativo como alternativa segura.
    if (typeof cursorCustom.showPopover !== "function") return;

    const raiz = document.documentElement;
    const mouseDisponible = matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const interactivos = "a, button, input, select, textarea, summary, [role='button'], [role='menuitem'], .carpeta-enlace, .carpeta-enlace-texto";
    let modales = Array.from(document.querySelectorAll("dialog:modal"));
    let posicion = null;

    cursorCustom.setAttribute("popover", "manual");

    function ocultar() {
      raiz.classList.remove("cursor-personalizado-activo");
      cursorCustom.classList.remove("cursor-visible", "cursor-hover");
    }

    function elevar() {
      // Pertenecer al modal activo evita quedar inerte. La top layer del
      // popover escapa de su overflow, transformaciones y apilamiento.
      modales = modales.filter((modal) => modal.isConnected && modal.matches(":modal"));
      const contenedor = modales[modales.length - 1] || document.body;
      try {
        if (cursorCustom.matches(":popover-open")) cursorCustom.hidePopover();
        if (cursorCustom.parentElement !== contenedor) contenedor.appendChild(cursorCustom);
        cursorCustom.showPopover();
      } catch (error) {
        ocultar();
      }
    }

    function actualizarObjetivo(objetivo) {
      // Los eventos y CSS del padre no entran en iframes externos.
      // Entregar el puntero al embed evita un cursor congelado o duplicado.
      if (!mouseDisponible.matches || !(objetivo instanceof Element) || objetivo.closest("iframe, object, embed")) {
        ocultar();
        return;
      }
      if (!cursorCustom.matches(":popover-open")) elevar();
      if (!cursorCustom.matches(":popover-open")) return;
      cursorCustom.classList.toggle("cursor-hover", Boolean(objetivo.closest(interactivos)));
      cursorCustom.classList.add("cursor-visible");
      raiz.classList.add("cursor-personalizado-activo");
    }

    function seguir(evento) {
      if (evento.pointerType !== "mouse") {
        posicion = null;
        ocultar();
        return;
      }
      posicion = { x: evento.clientX, y: evento.clientY };
      cursorCustom.style.left = posicion.x + "px";
      cursorCustom.style.top = posicion.y + "px";
      actualizarObjetivo(evento.target);
    }

    function revisarObjetivo() {
      if (posicion && document.hasFocus()) {
        actualizarObjetivo(document.elementFromPoint(posicion.x, posicion.y));
      }
    }

    document.addEventListener("pointermove", seguir, { capture: true, passive: true });
    document.addEventListener("pointerover", seguir, { capture: true, passive: true });
    document.addEventListener("pointerout", (evento) => {
      if (!evento.relatedTarget) { posicion = null; ocultar(); }
    }, true);
    window.addEventListener("blur", () => { posicion = null; ocultar(); });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { posicion = null; ocultar(); }
    });
    document.addEventListener("scroll", revisarObjetivo, { capture: true, passive: true });
    window.addEventListener("resize", revisarObjetivo, { passive: true });
    mouseDisponible.addEventListener("change", () => {
      if (!mouseDisponible.matches) ocultar();
    });

    // Reaccionar a aperturas/cierres, sin consultar el DOM cada frame.
    // El orden de apertura no coincide necesariamente con el del HTML.
    new MutationObserver((cambios) => {
      let actualizar = false;
      for (const cambio of cambios) {
        if (cambio.type === "attributes" && cambio.target.matches("dialog")) {
          modales = modales.filter((modal) => modal !== cambio.target);
          if (cambio.target.matches(":modal")) modales.push(cambio.target);
          actualizar = true;
        } else if (cambio.type === "childList") {
          if (modales.some((modal) => !modal.isConnected)) actualizar = true;
          for (const nodo of cambio.addedNodes) {
            if (!(nodo instanceof Element) || nodo === cursorCustom) continue;
            const nuevos = [...(nodo.matches("dialog:modal") ? [nodo] : []), ...nodo.querySelectorAll("dialog:modal")];
            for (const modal of nuevos) {
              if (!modales.includes(modal)) { modales.push(modal); actualizar = true; }
            }
          }
        }
      }
      if (actualizar) { elevar(); revisarObjetivo(); }
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["open"] });

    document.addEventListener("toggle", (evento) => {
      if (evento.target !== cursorCustom && evento.newState === "open" && evento.target.hasAttribute("popover")) {
        elevar();
      }
    }, true);

    elevar();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarCursorCustom, {
      once: true,
    });
  } else {
    inicializarCursorCustom();
  }
})();
