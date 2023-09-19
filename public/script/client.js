let adnData = {}; // Declarar formData en un alcance globa
const codonesCorrespondientes = [];
const codonesIndeseados = ["UAA", "UAG", "AUG"]; // Codones a evitar
const codones = {
  "UUU": "Fenilalanina (Phe)",
  "UUC": "Fenilalanina (Phe)",
  "UUA": "Leucina (Leu)",
  "UUG": "Leucina (Leu)",
  "CUU": "Leucina (Leu)",
  "CUC": "Leucina (Leu)",
  "CUA": "Leucina (Leu)",
  "CUG": "Leucina (Leu)",
  "AUU": "Isoleucina (Ile)",
  "AUC": "Isoleucina (Ile)",
  "AUA": "Isoleucina (Ile)",
  "AUG": "Metionina (Met) (Codón de Inicio)",
  "GUU": "Valina (Val)",
  "GUC": "Valina (Val)",
  "GUA": "Valina (Val)",
  "GUG": "Valina (Val)",
  "UCU": "Serina (Ser)",
  "UCC": "Serina (Ser)",
  "UCA": "Serina (Ser)",
  "UCG": "Serina (Ser)",
  "CCU": "Prolina (Pro)",
  "CCC": "Prolina (Pro)",
  "CCA": "Prolina (Pro)",
  "CCG": "Prolina (Pro)",
  "ACU": "Treonina (Thr)",
  "ACC": "Treonina (Thr)",
  "ACA": "Treonina (Thr)",
  "ACG": "Treonina (Thr)",
  "GCU": "Alanina (Ala)",
  "GCC": "Alanina (Ala)",
  "GCA": "Alanina (Ala)",
  "GCG": "Alanina (Ala)",
  "UAU": "Tirosina (Tyr)",
  "UAC": "Tirosina (Tyr)",
  "UAA": "(Codón de Terminación)",
  "UAG": "(Codón de Terminación)",
  "CAU": "Histidina (His)",
  "CAC": "Histidina (His)",
  "CAA": "Glutamina (Gln)",
  "CAG": "Glutamina (Gln)",
  "AAU": "Asparagina (Asn)",
  "AAC": "Asparagina (Asn)",
  "AAA": "Lisina (Lys)",
  "AAG": "Lisina (Lys)",
  "GAU": "Ácido aspártico (Asp)",
  "GAC": "Ácido aspártico (Asp)",
  "GAA": "Ácido glutámico (Glu)",
  "GAG": "Ácido glutámico (Glu)",
  "UGU": "Cisteína (Cys)",
  "UGC": "Cisteína (Cys)",
  "UGA": "(Codón de Terminación)",
  "UGG": "Triptófano (Trp)",
  "CGU": "Arginina (Arg)",
  "CGC": "Arginina (Arg)",
  "CGA": "Arginina (Arg)",
  "CGG": "Arginina (Arg)",
  "AGU": "Serina (Ser)",
  "AGC": "Serina (Ser)",
  "AGA": "Arginina (Arg)",
  "AGG": "Arginina (Arg)",
  "GGU": "Glicina (Gly)",
  "GGC": "Glicina (Gly)",
  "GGA": "Glicina (Gly)",
  "GGG": "Glicina (Gly)"
};


document.addEventListener("DOMContentLoaded", function () {
  const letrasPosibles = ['C', 'T', 'G', 'A'];
  const cantidadLetras = 15;
  const contenidoElement = document.getElementById("contenido");
  const botonGenerar = document.getElementById("botonGenerar");
  const arnElement = document.getElementById("contenidoarn");
  const ProtElement = document.getElementById("contenidoProt");

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
    contenidoElement.textContent =  letrasAleatorias;

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
    arnElement.textContent = arn;

    // Luego de generar el ARN, buscar los codones correspondientes
    codonesCorrespondientes.length = 0; // Vaciar el arreglo
    for (let i = 0; i < arn.length; i += 3) {
      const codon = arn.slice(i, i + 3); // Obtener el codón de 3 letras
      const aminoacido = codones[codon]; // Buscar el aminoácido correspondiente

      // Si se encontró un aminoácido correspondiente, agregarlo al arreglo
      if (aminoacido) {
        codonesCorrespondientes.push(aminoacido);
      }
    }
    ProtElement.textContent = codonesCorrespondientes.join(', ');
  });
});

function sendData() {
  const fechaHoraActual = new Date();
  let adn = document.getElementById('contenido').textContent;
  let arn = document.getElementById('contenidoarn').textContent;
  let prot = document.getElementById('contenidoProt').textContent;

  // Verificar si los datos tienen contenido antes de enviarlos
  if (adn.trim() !== '' && arn.trim() !== '' && prot.trim() !== '') {
    const adnData = {
      adn: adn,
      arn: arn,
      prot: prot,
      fechaHoraCreacion: fechaHoraActual
    };

    fetch('/guardarDatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adnData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Datos enviados y guardados correctamente en la base de datos.');
        } else {
          console.error('Error al enviar los datos al servidor.');
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
      });
      console.log(adnData);
  } else {
    console.log('No se enviaron datos vacíos a la base de datos.');
  }
}

async function elimData() {
  try {
    const response = await fetch('/elimDatos', {
      method: 'DELETE', // Usamos el método HTTP DELETE
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`Se eliminaron ${data.deletedCount} documentos.`);
    } else {
      console.error('Error al eliminar documentos.');
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
}