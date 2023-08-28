let adnData = {}; // Declarar formData en un alcance global

document.addEventListener("DOMContentLoaded", function () {
  const letrasPosibles = ['C', 'T', 'G', 'A'];
  const cantidadLetras = 15;
  const contenidoElement = document.getElementById("contenido");
  const botonGenerar = document.getElementById("botonGenerar");
  const arnElement = document.getElementById("contenidoarn");

  function generarLetraAleatoria(letrasPosibles) {
    const indiceAleatorio = Math.floor(Math.random() * letrasPosibles.length);
    return letrasPosibles[indiceAleatorio];
  }

  botonGenerar.addEventListener("click", function () {
    let letrasAleatorias = 'TAC'; // Iniciamos con 'TAC'
    let letrasFinales = ["ACT", "ATT", "ATC"];

    for (let i = 3; i < cantidadLetras; i++) {
      letrasAleatorias += generarLetraAleatoria(letrasPosibles);
    }
    letrasAleatorias += letrasFinales[Math.floor(Math.random() * letrasFinales.length)];
    contenidoElement.textContent = "El ADN es: " + letrasAleatorias;

    // Ahora realizamos la conversión de ADN a ARN y cadena complementaria
    let arn = '';
    for (let elem of letrasAleatorias) {
      switch (elem) {
        case 'A':
          arn += 'U';
          break;
        case 'C':
          arn += 'G';
          break;
        case 'T':
          arn += 'A';
          break;
        case 'G':
          arn += 'C';
          break;
        default:
          break;
      }
    }
    let adn = [arn];
    arnElement.textContent = "El ARNm es: " + adn;
  });
});

// Aquí movemos el evento click fuera del evento DOMContentLoaded
botonGenerar.addEventListener('click', function () {
  console.log("entro");
  sendData();
});

function sendData() {

  let adn = document.getElementById('contenido').textContent;
  let arn = document.getElementById('contenidoarn').textContent;
  let prot = document.getElementById('contenidoProt').textContent;

  adnData = {
    adn: adn,
    arn: arn,
    prot: prot
  };

  console.log(adnData);
}
