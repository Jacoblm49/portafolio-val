/* Galería de vistas previas en movimiento; el visor conserva la imagen completa. */
document.addEventListener('DOMContentLoaded', () => {
  const seccion=document.getElementById('galeria');
  const escena=seccion?.querySelector('.galeria-abanico-escena');
  const pista=escena?.querySelector('.galeria-abanico');
  if (!pista) return;
  const originales=[...pista.querySelectorAll('.abanico-foto')];
  const titulo=seccion.querySelector('.galeria-titulo-composicion');
  if (titulo) { escena.appendChild(titulo); titulo.classList.add('titulo-galeria-central'); }
  escena.classList.add('galeria-flotante');
  const fotos=[...originales];
  // Repetición visual del mismo contenido para que el recorrido sea continuo.
  originales.forEach(original=>{
    const copia=original.cloneNode(true);
    copia.removeAttribute('id');
    copia.addEventListener('click',()=>original.click());
    copia.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' ') {e.preventDefault();original.click();}
    });
    pista.appendChild(copia);fotos.push(copia);
  });
  const alturas=[.15,.72,.34,.86,.12,.68,.29,.83];
  const rotaciones=[-7,5,4,-5,6,-4,-6,5];
  const visor=document.getElementById('visorGaleria');
  const reducir=matchMedia('(prefers-reduced-motion: reduce)');
  let avance=0,anterior=0,pausa=false;
  escena.addEventListener('pointerenter',()=>pausa=false);
  escena.addEventListener('pointerleave',()=>pausa=false);
  escena.addEventListener('focusin',()=>pausa=false);
  escena.addEventListener('focusout',()=>pausa=false);
  function dibujar(t) {
    const dt=anterior?Math.min(t-anterior,50):0;anterior=t;
    if(!pausa&&!visor?.open&&!document.hidden&&!reducir.matches) avance+=dt*.000025;
    const ancho=escena.clientWidth,alto=escena.clientHeight;
    const tarjeta=Math.min(210,Math.max(125,ancho*.18));
    const espacioExtra=tarjeta*40;
    const recorrido=ancho+(tarjeta+espacioExtra)*2;
    fotos.forEach((foto,i)=>{
      const posicion=((i/fotos.length+avance)%1+1)%1;
      const x=posicion*recorrido-(tarjeta+espacioExtra);
      const y=alturas[i%alturas.length]*alto;
      foto.style.width=tarjeta+'px';
      foto.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rotaciones[i%rotaciones.length]}deg)`;
    });
    requestAnimationFrame(dibujar);
  }
  requestAnimationFrame(dibujar);
});
