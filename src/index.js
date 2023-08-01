const express = require('express');
const mongoose = require('mongoose');
const implementoRoutes = require("./routes/implementoRoutes")
const userRoutes = require("./routes/userRoutes")
const app = express();

app.use(express.json());

//conexión a mongodb local
try {
    mongoose.connect('mongodb+srv://md-project:md-superpwd@cluster0.hovtuoy.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado a mongodb');
} catch (error) {
    console.log(error);
}

app.use(implementoRoutes)
app.use(userRoutes)


// JOAQUIN
let informe = [
    { id: 1, name: 'Joaqupin Pérez', fecha: '2021-10-10', implemento: 'Martillo', estado: 'Bueno' },
    { id: 2, name: 'Eduardo Riquelme', fecha: '2021-10-10', implemento: 'Martillo', estado: 'Bueno' },
  ];

// Como usuario quiero poder ver los informes creados
app.get('/reports', function (request, response) {
    response.status(200).json(informe);
  });
  
  //Como usuario quiero poder crear informes nuevos
  app.post('/reports', function (request, response) {
    const report = request.body;
    informe.push(report);
    response.status(201).json(report);
  });
  
  //Como usuario quiero poder eliminar un informe 
  app.delete('/reports/:name', function (request, response) {
    const name = request.params.name;
    const report = informe.find((report) => report.name == name);
    if (report) {
      informe = informe.filter((report) => report.name != name);
      response.status(200).json(report);
    } else {
      response.status(404).json({ message: 'No se encuentra esta persona' });
    }
  });
  
  app.put('/reports/:id',async(req, res) => {
    const id = req.params.id;
    const report = informe.find((report) => report.id == id);
    if (report) {
      const { name, fecha, implemento, estado } = req.body;
      if (name) report.name = name;
      if (fecha) report.fecha = fecha;
      if (implemento) report.implemento = implemento;
      if (estado) report.estado = estado;
      res.status(200).json(report);
    } else {
      res.status(404).json({ message: 'No se encuentra esta persona' });
    }
  });

app.listen(3001, () => {
    console.log('Servidor listo',3001);
})