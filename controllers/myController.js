const OneModel = require('../models/myModel');
const moment = require('moment');

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
