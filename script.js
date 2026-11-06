

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

    // FOTOS DEBAJO DE “DETRÁS DE LA IDEA”.
    // Añade rutas entre comillas, separadas por comas, en cada proyecto.
    const fotosDebajo = {
      magara: ["Img/Modales/Punto seis 2.jpeg", "Img/puntoseis.png","Img/SEIIIIIIS.jpeg","Img/Modales/Punto seis.jpeg"], // Carpeta .Seis
      amano: ["img/Modales/Redes 1.jpg","img/Modales/Redes 7.jpeg","img/Modales/Redes 3.jpeg","img/Modales/Redes 4.jpeg","img/Modales/Redes 5.jpeg","img/Modales/Redes 6.jpeg"],                     // Carpeta Publicidad
      grafico: ["img/Modales/Feid 1.png","img/Modales/Feid 2.png","img/Modales/Feid 3.png","img/Modales/Feid 4.jpeg","img/Modales/Revista bad bunny 1.png","img/Modales/Revista bad bunny 2.png","img/Modales/Revista bad bunny 3.png","img/Modales/Revista bad bunny 4.png","img/Modales/Frater 1.png","img/Modales/Frater 2.png","img/Modales/Frater 3.png","img/Modales/Frater 4.png"],                   // Carpeta Otra mirada
      publicidad: []                 // Carpeta Redes
    };

    // VIDEOS DEBAJO DE “DETRÁS DE LA IDEA”.
    // Solo se renderiza para el proyecto especificado.
    const videosDebajo = {
      magara: [],
      amano: [],
      grafico: [],
      publicidad: ["Img/Modales/Video Magara (1).mp4", "Img/Modales/WhatsApp Video 2026-11-05 at 7.33.42 PM.mp4", "Img/Modales/WhatsApp Video 2026-11-05 at 7.35.46 PM.mp4","Img/Modales/aguadecoco.mp4"]
    };

    const proyectos = {

      magara: {
        titulo: "",
        categoria: "01 / BRANDING",

        descripcion:
          "Identidad visual · Agencia de publicidad",

        texto:
          "Seis personas, distintas ideas y un proyecto en común: .seis, nuestra agencia creativa. Me encargué de crear su identidad visual y diseñar para la marca, convirtiendo lo que somos como equipo en una propuesta gráfica con personalidad propia.",

        imagenes: [
          {
            src: "Img/Modales/BrandingPortada.jpeg",
            nombre: "Aplicación de marca"
          }
        ]
      },

      amano: {
        titulo: "",
        categoria: "02 / PUBLICIDAD",

        descripcion:
          "Campañas · Comunicación visual",

        texto:
          "Seis personas, distintas ideas y un proyecto en común: .seis, nuestra agencia creativa. Me encargué de crear su identidad visual y diseñar para la marca, convirtiendo lo que somos como equipo en una propuesta gráfica con personalidad propia.",

        imagenes: [
          {
            src: "Img/Modales/PublicidadPortada.jpeg",
            nombre: "Dirección de arte"
          }
        ]
      },

      grafico: {
        titulo: "",
        categoria: "03 / EDITORIAL",

        descripcion:
          "Tipografía · Collage · Composición",

        texto:
          "Experimentación gráfica con tipografía, color, texturas y collage para crear composiciones visuales con personalidad.",

        imagenes: [
          {
            src: "Img/Modales/EditorialPortada.jpeg",
            nombre: "Diseño editorial"
          }
        ]
      },

      publicidad: {
        titulo: "",
        categoria: "04 / REDES",

        descripcion:
          "Contenido digital · Redes sociales",

        texto:
          "Piezas digitales e impresas creadas para comunicar promociones, fortalecer marcas y conectar con diferentes públicos.",

        imagenes: [
          {
            src: "Img/Modales/AuidovisualPortada.jpeg",
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

      const fotosInferiores = document.getElementById("fotosDebajoProyecto");
      fotosInferiores.replaceChildren();

      (fotosDebajo[id] || []).forEach((ruta) => {
        const foto = document.createElement("img");
        foto.src = ruta;
        foto.alt = "Detalle de " + proyecto.titulo;
        foto.loading = "lazy";
        fotosInferiores.appendChild(foto);
      });

      (videosDebajo[id] || []).forEach((ruta) => {
        const video = document.createElement("video");
        video.src = ruta;
        video.controls = true;
        video.style.maxWidth = "100%";
        fotosInferiores.appendChild(video);
      });

      fotosInferiores.hidden = !fotosInferiores.children.length;

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


/* Contacto - diario interactivo.
   Para habilitar el envío mediante una app de correo,
   coloca tu dirección real en EMAIL_DESTINO_DIARIO. */
(() => {
  const EMAIL_DESTINO_DIARIO = '';
  const libro = document.getElementById('diarioLibro');
  const portada = document.getElementById('diarioPortada');
  const formulario = document.getElementById('diarioFormulario');
  const estado = document.getElementById('diarioEstado');
  const pista = document.getElementById('diarioPista');
  if (!libro || !formulario) return;
  const abrir = () => {
    libro.classList.add('esta-abierto');
    portada.setAttribute('aria-expanded', 'true');
    const interior = document.getElementById('diarioAbierto');
    if (interior) interior.setAttribute('aria-hidden', 'false');
    if (pista) pista.textContent = '♡ Escribe tu idea en las páginas del diario';
  };
  const cerrar = () => {
    libro.classList.remove('esta-abierto');
    portada.setAttribute('aria-expanded', 'false');
    const interior = document.getElementById('diarioAbierto');
    if (interior) interior.setAttribute('aria-hidden', 'true');
    if (pista) pista.textContent = '✳ Abre la portada para dejar tu mensaje';
  };
  document.querySelectorAll('[data-diario-abrir]').forEach(el => el.addEventListener('click', abrir));
  document.querySelectorAll('[data-diario-cerrar]').forEach(el => el.addEventListener('click', cerrar));
  formulario.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!formulario.reportValidity()) return;
    const campos = new FormData(formulario);
    const nombre = String(campos.get('nombre') || '').trim();
    const correo = String(campos.get('correo') || '').trim();
    const asunto = String(campos.get('asunto') || '').trim();
    const mensaje = String(campos.get('mensaje') || '').trim();
    const cuerpo = `Nombre: ${nombre}\nCorreo: ${correo}\nProyecto: ${asunto}\n\n${mensaje}`;
    if (EMAIL_DESTINO_DIARIO) {
      window.location.href = `mailto:${EMAIL_DESTINO_DIARIO}?subject=${encodeURIComponent('Portafolio · ' + asunto)}&body=${encodeURIComponent(cuerpo)}`;
      estado.textContent = 'Se abrió tu correo para revisar y enviar el mensaje. Confirma el envío allí.';
    } else {
      try {
        await navigator.clipboard.writeText(cuerpo);
        estado.textContent = '¡Tu nota está copiada! Para recibir mensajes, configura tu correo en script.js.';
      } catch (_) {
        estado.textContent = 'Configura EMAIL_DESTINO_DIARIO en script.js para habilitar el envío por correo.';
      }
    }
  });
})();

