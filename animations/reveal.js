/* Entradas reutilizables: data-reveal="left|right|up|down|fade".
   data-reveal-delay="60" añade un desfase en ms (máximo 240).
   Cada elemento se revela una vez: al cargar si ya está visible, o al hacer scroll.
   No modifica transform, los listeners existentes ni el comportamiento del scroll. */
(() => {
  "use strict";

  function initReveals() {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    if (!elements.length || !Element.prototype.animate ||
        !window.CSS?.supports("translate", "1px 0")) return;
    // Si falta la hoja CSS, dejamos el contenido tal como estaba.
    if (getComputedStyle(elements[0]).getPropertyValue("--reveal-enabled").trim() !== "1") return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const compactScreen = matchMedia("(max-width: 760px)");
    const pending = new Set();
    const running = new Map();
    let observer;
    let frame = 0;
    let lastScrollY = window.scrollY;
    let initialRevealReady = false;

    function inViewport(rect) {
      return rect.width > 0 && rect.height > 0 &&
        rect.bottom > 0 && rect.top < window.innerHeight &&
        rect.right > 0 && rect.left < document.documentElement.clientWidth;
    }

    function showImmediately(element) {
      pending.delete(element);
      observer?.unobserve(element);
      element.classList.remove("reveal-pending");
      running.get(element)?.cancel();
      running.delete(element);
    }

    function stopWatchingIfDone() {
      if (!pending.size) {
        window.removeEventListener("scroll", onScroll);
        observer?.disconnect();
      }
    }

    function play(element, rect) {
      const style = getComputedStyle(element);
      const direction = element.dataset.reveal;
      const width = document.documentElement.clientWidth;
      const height = window.innerHeight;
      // Las entradas laterales parten del borde de la pantalla.
      // En móviles reducimos el recorrido para mantener una lectura cómoda.
      const limit = compactScreen.matches ? 48 : Infinity;
      let x = 0;
      let y = 0;
      if (!reducedMotion.matches) {
        if (direction === "left") x = -Math.min(rect.right + 24, limit);
        if (direction === "right") x = Math.min(width - rect.left + 24, limit);
        if (direction === "up") y = Math.min(height - rect.top + 24, 120, limit);
        if (direction === "down") y = -Math.min(96, limit);
      }
      const delay = reducedMotion.matches ? 0 :
        Math.min(240, Math.max(0, Number(element.dataset.revealDelay) || 0));
      const duration = parseFloat(style.getPropertyValue("--reveal-duration")) || 600;
      const easing = style.getPropertyValue("--reveal-ease").trim();
      showImmediately(element);
      // translate es independiente de transform: conserva giros, hover y balanceos.
      // La animación no deja estilos inline ni sustituye animaciones anteriores.
      try {
        const animation = element.animate([
          { opacity: 0, translate: x + "px " + y + "px" },
          { opacity: 1, translate: "0px 0px" }
        ], { duration, delay, easing, fill: "backwards" });
        running.set(element, animation);
        animation.onfinish = () => {
          running.delete(element);
          animation.cancel();
        };
      } catch {
        // Si el navegador rechaza una opción, el contenido ya está visible.
        showImmediately(element);
      }
    }

    function revealVisible(animate) {
      // Todas las lecturas primero; después las escrituras. No medimos por frame
      // de animación: solo en frames donde cambió el scroll (o al restaurar vista).
      const visible = [];
      pending.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (inViewport(rect)) visible.push({ element, rect });
      });
      visible.forEach(({ element, rect }) => {
        if (animate) play(element, rect);
        else showImmediately(element);
      });
      stopWatchingIfDone();
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextY = window.scrollY;
        if (nextY === lastScrollY) return;
        lastScrollY = nextY;
        revealVisible(true);
      });
    }

    // Preparar todos los elementos antes del primer frame. Después de que el
    // navegador restaure el scroll, se anima lo que realmente quedó visible.
    elements.forEach(element => {
      pending.add(element);
      element.classList.add("reveal-pending");
    });

    // Un filtro o una imagen pueden cambiar el layout sin scroll. En ese caso
    // mostrar al instante, sin dejar controles ocultos ni disparar una entrada.
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        if (!initialRevealReady ||
            !entries.some(entry => entry.isIntersecting)) return;
        if (window.scrollY !== lastScrollY) onScroll();
        else revealVisible(false);
      });
      pending.forEach(element => observer.observe(element));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    const restoreVisible = () => revealVisible(false);
    const revealVisibleOnLoad = () => {
      lastScrollY = window.scrollY;
      revealVisible(true);
    };
    window.addEventListener("resize", restoreVisible, { passive: true });
    window.addEventListener("load", revealVisibleOnLoad, { once: true });
    window.addEventListener("pageshow", revealVisibleOnLoad);

    // Dos frames permiten que el navegador recupere la posición de una recarga
    // antes de calcular qué sección debe entrar.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initialRevealReady = true;
        revealVisibleOnLoad();
      });
    });
    document.addEventListener("focusin", event => {
      // Tab puede llegar antes que el scroll: mostrar el control y sus ancestros.
      let element = event.target.closest("[data-reveal]");
      while (element) {
        showImmediately(element);
        element = element.parentElement?.closest("[data-reveal]");
      }
      stopWatchingIfDone();
    });
    const finishRunning = () => [...running.keys()].forEach(showImmediately);
    reducedMotion.addEventListener("change", () => {
      finishRunning();
      restoreVisible();
    });
    window.addEventListener("beforeprint", () => {
      [...pending].forEach(showImmediately);
      finishRunning();
      stopWatchingIfDone();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveals, { once: true });
  } else {
    initReveals();
  }
})();
