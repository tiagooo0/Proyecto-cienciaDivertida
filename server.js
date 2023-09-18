const mongoose = require("mongoose");
const express = require('express');
const Post = require('././models/myModel'); // Reemplaza con la ruta correcta a tu modelo

const app = require("./app");
const dotenv = require("dotenv");

//Carga de variables de entorno
 dotenv.config({ path: "./config.env" });
 const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

//Conexión al cloud de Mongodb Atlas
 mongoose
     .connect(DB, {
         useNewUrlParser: true,
     })
     .then((con) => {
         console.log("Connected to database");
     });

const port = 3000;
//Corremos el servidor en el puerto seleccionado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/ correctamente`);
});
app.use(express.json());

app.post('/guardarDatos', async (req, res) => {
  try {
    const { adn, arn, prot, fechaHoraCreacion } = req.body;

    // Crear una instancia del modelo y guardar los datos en la base de datos
    const nuevoDato = new Post({ adn, arn, proteina: prot, fechaHoraCreacion });
    await nuevoDato.save();

    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});