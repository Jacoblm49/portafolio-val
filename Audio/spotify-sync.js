/* ==========================================
   SPOTIFY + MÚSICA DE FONDO
========================================== */

(() => {
  "use strict";

  const PLAYLIST_URL =
    "https://open.spotify.com/playlist/54H2hj7urLzAH6Uqz5PTmA";

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const contenedor = document.getElementById("spotifyPlayer");
    if (!contenedor) return;

    IFrameAPI.createController(
      contenedor,
      {
        width: "100%",
        height: "352",
        url: PLAYLIST_URL
      },
      (controlador) => {
        const detenerMusicaDeFondo = () => {
          document.dispatchEvent(new Event("spotify:playback-started"));
        };

        controlador.addListener(
          "playback_started",
          detenerMusicaDeFondo
        );

        controlador.addListener("playback_update", (evento) => {
          if (evento.data && evento.data.isPaused === false) {
            detenerMusicaDeFondo();
          }
        });
      }
    );
  };
})();
