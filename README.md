Y AHORA ESTAAAAAAAAASSSSSS TU SIN MI Y QUE HAGO CON MI AMOOOOOOOOOR EL QUE ERA PARA TI 


document.addEventListener('DOMContentLoaded', function () {
  let newForm = document.getElementById('newForm');



  newForm.addEventListener('submit', function (evento) {
    console.log("entro")
    evento.preventDefault();
    sendData();
  });

  function sendData() {
    let titulo = document.getElementById('titulo').value;
    let date = document.getElementById('date').value;

    let formData = {
      titulo: titulo,
      date: date
    };

    // Envío de datos al servidor utilizando AJAX (XHR)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/eventos');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Evento guardado:', xhr.responseText);
        window.location.href = '/';
      } else {
        console.log('Error al guardar el evento:', xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(formData));
  }
});