const OneModel = require('../models/myModel');
const moment = require('moment');
const myModel = require('../models/myModel');

exports.inicio = (req, res) => {
  res.status(200).render('index');
};

exports.generador = async (req, res) => {
  try {
    // Obtener datos desde la base de datos usando Mongoose o tu método preferido
    const datosDesdeBD = await OneModel.find(); // Esto asume que estás utilizando Mongoose y el modelo se llama OneModel

    // Formatear la fecha y hora en el formato deseado
    const datosFormateados = datosDesdeBD.map((dato) => ({
      adn: dato.adn,
      arn: dato.arn,
      proteina: dato.proteina,
      fechaHoraCreacion: moment(dato.fechaHoraCreacion).format('YYYY-MM-DD HH:mm:ss'), // Cambia el formato según tus preferencias
    }));

    res.status(200).render('generador', { datos: datosFormateados });
    console.log('tiene los datos')
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).send('Error al obtener datos desde la base de datos');
  }
};

exports.elimDatos = async (req, res) => {
  try {
    const resultado = await myModel.deleteMany({});
    // Envía una respuesta JSON con el recuento eliminado
    res.json({ deletedCount: resultado.deletedCount });
  } catch (error) {
    console.error('Error al eliminar documentos:', error);
    // Envía una respuesta de error JSON
    res.status(500).json({ error: 'Error al eliminar documentos' });
  }

  // Realiza la redirección después de la respuesta JSON
  // res.redirect('/generador'); comentado debido a que me crashea
};
