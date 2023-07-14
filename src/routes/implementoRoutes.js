const express = require('express');
const router = express.Router();
const Implemento = require('../models/implemento');
const { getAllImplementos, getAllImplementosByestado } = require("../controllers/implementoController")

// Ruta para registrar un nuevo implemento

router.post('/implementos', async (req, res) => {
    try {
      const { descripcion, categoria, estado, numeroSerie } = req.body;
  
      // Crear un nuevo Implemento
      const nuevoImplemento = new Implemento({
        descripcion,
        categoria,
        estado,
        numeroSerie
      });
  
      // Guardar el Implemento en la base de datos
      await nuevoImplemento.save();
  
      res.status(200).json({ message: 'Implemento agregado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al Ingresar Implemento', error });
    }
  });

router.get('/implementos', async (req, res) => {
    const implementos = await getAllImplementos();
    res.json(implementos)

})

router.get('/implementos/:id', async (req, res) => {
    const { id } = req.params
    const implemento = await Implemento.findById(id)
    res.json(implemento)

})

router.delete('/implementos/:id', async (req, res) => {
    const { id } = req.params
    const implemento = await Implemento.findByIdAndDelete(id)
    res.json(implemento)

})


//puras weas

router.get('/implementos', async (req, res) => {
    const implementos = await getAllImplementosByestadoOperativo("operativo");
    res.json(implementos)

})

module.exports = router;