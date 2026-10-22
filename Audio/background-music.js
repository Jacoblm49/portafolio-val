/* ==========================================
   MÚSICA DE FONDO
========================================== */

// Cambia este valor entre 0 (silencio) y 1 (volumen máximo).
const VOLUMEN_MUSICA_FONDO = 0.5;

(() => {
  "use strict";

  const musicaFondo = document.getElementById("musicaFondo");
  const pantallaEntrada = document.getElementById("entradaMusica");
  const botonEntrar = document.getElementById("entrarPortafolio");

  if (!musicaFondo) return;

  const controlMusica = document.createElement("button");

  controlMusica.type = "button";
  controlMusica.className = "control-musica-fondo";
  controlMusica.setAttribute("aria-pressed", "false");
  controlMusica.textContent = "♫ ACTIVAR MÚSICA";
  document.body.appendChild(controlMusica);

  musicaFondo.loop = true;
  musicaFondo.preload = "auto";
  musicaFondo.volume = Math.min(
    1,
    Math.max(0, VOLUMEN_MUSICA_FONDO)
  );

  async function reproducirMusica() {
    try {
      await musicaFondo.play();
      controlMusica.textContent = "♫ MÚSICA: ON";
      controlMusica.setAttribute("aria-pressed", "true");
      quitarActivadores();
      return true;
    } catch {
      controlMusica.textContent = "♫ ACTIVAR MÚSICA";
      return false;
    }
  }

  function alternarMusica() {
    if (musicaFondo.paused) {
      reproducirMusica();
      return;
    }

    musicaFondo.pause();
    controlMusica.textContent = "♫ MÚSICA: OFF";
    controlMusica.setAttribute("aria-pressed", "false");
  }

  function pausarPorSpotify() {
    if (musicaFondo.paused) return;

    musicaFondo.pause();
    controlMusica.textContent = "♫ MÚSICA: OFF";
    controlMusica.setAttribute("aria-pressed", "false");
  }

  function activarEnInteraccion(evento) {
    // El propio botón controla play/pausa mediante su evento click.
    if (evento.target === controlMusica || evento.target === botonEntrar) return;
    reproducirMusica();
  }

  async function entrarAlPortafolio() {
    if (!pantallaEntrada || !botonEntrar) return;

    botonEntrar.disabled = true;
    botonEntrar.textContent = "ENTRANDO...";

    // Esta llamada ocurre dentro del clic y desbloquea el audio legítimamente.
    await reproducirMusica();

    let finalizada = false;
    const alTerminarTransicion = (evento) => {
      if (evento.target === pantallaEntrada) finalizarEntrada();
    };
    const finalizarEntrada = () => {
      if (finalizada) return;
      finalizada = true;
      pantallaEntrada.removeEventListener(
        "transitionend",
        alTerminarTransicion
      );
      document.dispatchEvent(new Event("portfolio:entered"));
      document.body.classList.remove("entrada-pendiente");
      pantallaEntrada.hidden = true;

      const contenido = document.querySelector("main");
      if (contenido) {
        contenido.setAttribute("tabindex", "-1");
        contenido.focus({ preventScroll: true });
      }
    };

    pantallaEntrada.classList.add("saliendo");
    pantallaEntrada.addEventListener("transitionend", alTerminarTransicion);
    window.setTimeout(finalizarEntrada, 550);
  }

  function quitarActivadores() {
    document.removeEventListener("pointerdown", activarEnInteraccion, true);
    document.removeEventListener("keydown", activarEnInteraccion, true);
    document.removeEventListener("touchstart", activarEnInteraccion, true);
  }

  controlMusica.addEventListener("click", alternarMusica);
  botonEntrar?.addEventListener("click", entrarAlPortafolio);
  botonEntrar?.focus({ preventScroll: true });
  document.addEventListener("spotify:playback-started", pausarPorSpotify);

  musicaFondo.addEventListener("error", () => {
    controlMusica.textContent = "♫ AUDIO NO DISPONIBLE";
    controlMusica.disabled = true;
  });

  // Primer intento: reproduce desde la carga cuando el navegador lo permite.
  reproducirMusica();

  // Si el autoplay fue bloqueado, comienza con la primera interacción.
  document.addEventListener("pointerdown", activarEnInteraccion, true);
  document.addEventListener("keydown", activarEnInteraccion, true);
  document.addEventListener("touchstart", activarEnInteraccion, true);
})();
