document.addEventListener("DOMContentLoaded", function () {
    const letrasPosibles = ['C', 'T', 'G', 'A'];
    const cantidadLetras = 15;
    const contenidoElement = document.getElementById("contenido");
    const botonGenerar = document.getElementById("botonGenerar");
  
    function generarLetraAleatoria(letrasPosibles) {
      const indiceAleatorio = Math.floor(Math.random() * letrasPosibles.length);
      return letrasPosibles[indiceAleatorio];
    }
  
    botonGenerar.addEventListener("click", function () {
      let letrasAleatorias = 'TAC'; // Iniciamos con 'TAC'
      let letrasFinales = ["ACT", "ATT" ,"ATC"]
  
      for (let i = 3; i < cantidadLetras; i++) {
        letrasAleatorias += generarLetraAleatoria(letrasPosibles);
      }
      letrasAleatorias += letrasFinales[Math.floor(Math.random() * letrasFinales.length)]
      contenidoElement.textContent = letrasAleatorias;
    });
  });
   