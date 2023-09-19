const myController = require('../controllers/myController');
const express = require('express');
const router = express.Router();

//Defino rutas y acciones de respuesta
router.route('/').get(myController.inicio);
router.route('/generador').get(myController.generador);
router.route('/elimDatos').delete(myController.elimDatos);

module.exports = router;