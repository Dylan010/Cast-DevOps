const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Sirve archivos estáticos desde el directorio actual
app.use(express.static('./'));

// Ruta para servir el API_KEY al cliente
app.get('/api/key', (req, res) => {
  res.json({ API_KEY: process.env.API_KEY });
});

// Ruta para manejar todas las demás solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});