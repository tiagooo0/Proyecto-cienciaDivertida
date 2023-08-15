document.addEventListener("DOMContentLoaded", function () {
    const letrasPosibles = ['C', 'T', 'G', 'A'];
    const cantidadLetras = 18;
    const contenidoElement = document.getElementById("contenido");
    const botonGenerar = document.getElementById("botonGenerar");
  
    function generarLetraAleatoria(letrasPosibles) {
      const indiceAleatorio = Math.floor(Math.random() * letrasPosibles.length);
      return letrasPosibles[indiceAleatorio];
    }
  
    botonGenerar.addEventListener("click", function () {
      let letrasAleatorias = 'TCA'; // Iniciamos con 'TCA'
  
      for (let i = 3; i < cantidadLetras; i++) {
        letrasAleatorias += generarLetraAleatoria(letrasPosibles);
      }
  
      contenidoElement.textContent = letrasAleatorias;
      // document.getElementById("contenido").innerHTML = letrasAleatorias; // No es necesario esta línea aquí
    });
  });
  