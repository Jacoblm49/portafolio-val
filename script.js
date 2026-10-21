

/* ==========================================
   PORTAFOLIO VALENTINA RODRÍGUEZ
   SCRIPT ÚNICO Y CORREGIDO
========================================== */

(function () {
  "use strict";

  function iniciarPortafolio() {

    /* ======================================
       1. FILTROS DEL ARCHIVADOR
    ====================================== */

    const botonesFiltro = document.querySelectorAll(
      ".filtro-carpeta"
    );

    const carpetas = document.querySelectorAll(
      ".archivador .carpeta"
    );

    botonesFiltro.forEach((boton) => {
      boton.addEventListener("click", function () {
        const filtro = boton.dataset.filtro;

        botonesFiltro.forEach((otroBoton) => {
          const activo = otroBoton === boton;

          otroBoton.classList.toggle("activo", activo);

          otroBoton.setAttribute(
            "aria-pressed",
            String(activo)
          );
        });

        carpetas.forEach((carpeta) => {
          const mostrar =
            filtro === "todos" ||
            carpeta.dataset.categoria === filtro;

          carpeta.classList.toggle("oculta", !mostrar);
        });

        // Actualizar posiciones de animaciones si existen.
        if (
          typeof ScrollTrigger !== "undefined" &&
          typeof ScrollTrigger.refresh === "function"
        ) {
          ScrollTrigger.refresh();
        }
      });
    });


    /* ======================================
       2. FLECHAS DE LA GALERÍA
    ====================================== */

    const galeria = document.getElementById(
      "galeriaCarrusel"
    );

    const anterior = document.getElementById(
      "galeriaAnterior"
    );

    const siguiente = document.getElementById(
      "galeriaSiguiente"
    );

    function moverGaleria(direccion) {
      if (!galeria) return;

      const pieza = galeria.querySelector(".pieza");

      if (!pieza) return;

      const estilos = getComputedStyle(galeria);

      const espacio =
        parseFloat(estilos.columnGap) || 20;

      const distancia =
        pieza.getBoundingClientRect().width + espacio;

      galeria.scrollBy({
        left: direccion * distancia,
        behavior: "smooth"
      });
    }

    if (anterior) {
      anterior.addEventListener("click", function () {
        moverGaleria(-1);
      });
    }

    if (siguiente) {
      siguiente.addEventListener("click", function () {
        moverGaleria(1);
      });
    }


    /* ======================================
       3. CONTENIDO DE LOS PROYECTOS
    ====================================== */

    const proyectos = {

      magara: {
        titulo: "Mágara.",
        categoria: "01 / BRANDING",

        descripcion:
          "Identidad visual · Caribe colombiano",

        texto:
          "Un universo visual inspirado en la identidad, los colores y la riqueza gráfica del Caribe colombiano. Incluye identidad visual, diseño de empaques, aplicaciones gráficas y contenido para redes sociales.",

        imagenes: [
          {
            src: "Img/Cartel tropical Mágara en pared soleada.png",
            nombre: "Aplicación de marca"
          }
        ]
      },

      amano: {
        titulo: "Amano.",
        categoria: "02 / PACKAGING",

        descripcion:
          "Productos · Dirección de arte",

        texto:
          "Contenido digital para una marca de productos saludables, con una dirección visual limpia y una comunicación cercana. Incluye piezas para redes sociales, fotografía de producto y contenido audiovisual.",

        imagenes: [
          {
            src: "Img/amano.jpeg",
            nombre: "Dirección de arte"
          }
        ]
      },

      grafico: {
        titulo: "Otra mirada.",
        categoria: "03 / EDITORIAL",

        descripcion:
          "Tipografía · Collage · Composición",

        texto:
          "Experimentación gráfica con tipografía, color, texturas y collage para crear composiciones visuales con personalidad.",

        imagenes: [
          {
            src: "Img/Revista Fraternos en sala retro musical.png",
            nombre: "Diseño editorial"
          }
        ]
      },

      publicidad: {
        titulo: "Hazte ver.",
        categoria: "04 / PUBLICIDAD",

        descripcion:
          "Campañas · Comunicación visual",

        texto:
          "Piezas digitales e impresas creadas para comunicar promociones, fortalecer marcas y conectar con diferentes públicos.",

        imagenes: [
          {
            src: "imagenes/publicidad-01.jpg",
            nombre: "Comunicación publicitaria"
          }
        ]
      }

    };


    /* ======================================
       4. ELEMENTOS DEL MODAL
    ====================================== */

    const modal = document.getElementById(
      "hojaProyecto"
    );

    const tituloModal = document.getElementById(
      "tituloHojaProyecto"
    );

    const categoriaModal = document.getElementById(
      "categoriaHojaProyecto"
    );

    const descripcionModal = document.getElementById(
      "descripcionHojaProyecto"
    );

    const textoModal = document.getElementById(
      "textoHojaProyecto"
    );

    const galeriaModal = document.getElementById(
      "imagenesHojaProyecto"
    );


    /* ======================================
       5. ABRIR UN PROYECTO
    ====================================== */

    function abrirProyecto(id) {
      const proyecto = proyectos[id];

      if (!proyecto) return;

      // Comprobar que el HTML del modal exista.
      if (
        !modal ||
        !tituloModal ||
        !categoriaModal ||
        !descripcionModal ||
        !textoModal ||
        !galeriaModal
      ) {
        console.error(
          "Faltan elementos del modal hojaProyecto en index.html"
        );
        return;
      }

      // Colocar la información correspondiente.
      tituloModal.textContent = proyecto.titulo;

      categoriaModal.textContent = proyecto.categoria;

      descripcionModal.textContent =
        proyecto.descripcion;

      textoModal.textContent = proyecto.texto;

      // Limpiar imágenes del proyecto anterior.
      galeriaModal.replaceChildren();

      // Crear las imágenes del nuevo proyecto.
      proyecto.imagenes.forEach((imagen) => {
        const figura = document.createElement("figure");

        const foto = document.createElement("img");

        const descripcionFoto =
          document.createElement("figcaption");

        foto.src = imagen.src;
        foto.alt = imagen.nombre;
        foto.loading = "lazy";

        descripcionFoto.textContent = imagen.nombre;

        figura.appendChild(foto);
        figura.appendChild(descripcionFoto);

        galeriaModal.appendChild(figura);
      });

      // Abrir una sola vez.
      if (!modal.open) {
        modal.showModal();
      }

      // Mostrar el principio de la hoja.
      modal.scrollTop = 0;
    }


    /* ======================================
       6. CONECTAR LAS CUATRO CARPETAS
    ====================================== */

    const rutas = {
      "#magara": "magara",
      "#amano": "amano",
      "#grafico": "grafico",
      "#publicidad": "publicidad"
    };

    document.querySelectorAll(
      ".archivador .carpeta-enlace"
    ).forEach((enlace) => {

      enlace.addEventListener("click", function (evento) {

        // Evitar que el navegador baje a otra sección.
        evento.preventDefault();

        const id =
          enlace.dataset.proyecto ||
          rutas[enlace.getAttribute("href")];

        abrirProyecto(id);
      });

    });


    /* ======================================
       7. CERRAR EL MODAL
    ====================================== */

    function cerrarProyecto() {
      if (!modal) return;

      if (modal.open) {
        modal.close();
      }
    }

    const cerrarArriba = document.getElementById(
      "cerrarHojaProyecto"
    );

    const cerrarAbajo = document.getElementById(
      "cerrarHojaAbajo"
    );

    if (cerrarArriba) {
      cerrarArriba.addEventListener(
        "click",
        cerrarProyecto
      );
    }

    if (cerrarAbajo) {
      cerrarAbajo.addEventListener(
        "click",
        cerrarProyecto
      );
    }

    // Cerrar al pulsar Escape funciona automáticamente
    // porque utilizamos un <dialog> nativo.

    // Cerrar al pulsar fuera de la hoja.
    if (modal) {
      modal.addEventListener("click", function (evento) {
        if (evento.target !== modal) return;

        const rect = modal.getBoundingClientRect();

        const clicFuera =
          evento.clientX < rect.left ||
          evento.clientX > rect.right ||
          evento.clientY < rect.top ||
          evento.clientY > rect.bottom;

        if (clicFuera) {
          cerrarProyecto();
        }
      });
    }

    console.log(
      "Portafolio iniciado: filtros, galería y modal listos."
    );
  }


  /* ======================================
     8. INICIAR UNA SOLA VEZ
  ====================================== */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarPortafolio,
      { once: true }
    );
  } else {
    iniciarPortafolio();
  }

})(); 

/* ==========================================
   REPRODUCTOR MUSICAL Y2K
   GRABADORA ROSA + CASETES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const trackTitle = document.getElementById("trackTitle");
  const progressBar = document.getElementById("progressBar");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  const tracks = Array.from(
    document.querySelectorAll(".cassette-track")
  );

  // Comprobar que el reproductor existe
  if (
    !audio || !playBtn || !prevBtn ||
    !nextBtn || !trackTitle || !progressBar ||
    !currentTime || !duration || !tracks.length
  ) {
    console.warn("Faltan elementos del reproductor musical.");
    return;
  }

  let currentIndex = 0;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${String(sec).padStart(2, "0")}`;
  }

  function loadTrack(index) {
    currentIndex = (index + tracks.length) % tracks.length;

    const track = tracks[currentIndex];

    audio.pause();
    audio.src = track.dataset.src;
    audio.load();

    trackTitle.textContent = track.dataset.title;

    tracks.forEach((item, i) => {
      item.classList.toggle("active", i === currentIndex);
    });

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    playBtn.textContent = "▶";
  }

  async function playTrack() {
    try {
      await audio.play();
      playBtn.textContent = "⏸";
    } catch (error) {
      console.error("No se pudo reproducir el audio:", error);
      playBtn.textContent = "▶";
    }
  }

  function pauseTrack() {
    audio.pause();
    playBtn.textContent = "▶";
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });

  prevBtn.addEventListener("click", () => {
    loadTrack(currentIndex - 1);
    playTrack();
  });

  nextBtn.addEventListener("click", () => {
    loadTrack(currentIndex + 1);
    playTrack();
  });

  tracks.forEach((track, index) => {
    track.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progressBar.value =
        (audio.currentTime / audio.duration) * 100;
    }
  });

  progressBar.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime =
        (Number(progressBar.value) / 100) * audio.duration;
    }
  });

  audio.addEventListener("ended", () => {
    loadTrack(currentIndex + 1);
    playTrack();
  });

  audio.addEventListener("error", () => {
    console.error(
      "No se encontró o no se pudo cargar:",
      audio.currentSrc
    );
    playBtn.textContent = "▶";
  });

  loadTrack(0);

});

/* SONIDO AL ABRIR LAS CARPETAS */

document.addEventListener("DOMContentLoaded", () => {

  const sonido = new Audio("audio/photos-click-409642.mp3");

  sonido.volume = 0.6;
  sonido.playbackRate = 1.8;
  sonido.preload = "auto";

  document.querySelectorAll(".carpeta-enlace").forEach(carpeta => {

    carpeta.addEventListener("click", () => {

      sonido.pause();
      sonido.currentTime = 0;

      sonido.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
      });

    });

  });

});

/* ==========================================
   ABRIR FOTOGRAFÍAS COMPLETAS DEL ABANICO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const visor = document.getElementById("visorGaleria");
  const imagenGrande = document.getElementById("imagenVisorGaleria");
  const titulo = document.getElementById("tituloVisorGaleria");
  const cerrar = document.getElementById("cerrarVisorGaleria");

  const fotos = document.querySelectorAll(
    "#galeria .abanico-foto"
  );

  if (!visor || !imagenGrande || !titulo || !cerrar) {
    return;
  }

  function abrirFoto(foto) {
    const imagen = foto.querySelector("img");
    const texto = foto.querySelector("figcaption");

    if (!imagen) return;

    imagenGrande.src = imagen.currentSrc || imagen.src;
    imagenGrande.alt = imagen.alt;

    titulo.textContent = texto
      ? texto.textContent.trim()
      : imagen.alt;

    visor.showModal();
  }

  fotos.forEach(foto => {

    foto.setAttribute("tabindex", "0");
    foto.setAttribute("role", "button");
    foto.setAttribute(
      "aria-label",
      "Ampliar " + (foto.querySelector("img")?.alt || "fotografía")
    );

    foto.addEventListener("click", () => {
      abrirFoto(foto);
    });

    foto.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        abrirFoto(foto);
      }
    });

  });

  cerrar.addEventListener("click", () => {
    visor.close();
  });

  visor.addEventListener("click", (event) => {
    if (event.target === visor) {
      visor.close();
    }
  });

});
