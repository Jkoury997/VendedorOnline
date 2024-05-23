const express = require('express');
const connectDB = require('./database/config');
const morgan = require('morgan');

const app = express();
const port = 3000;

//Routa Main
const mainRoute = require("./routes/mainRouter")

// Middleware para parsear JSON
app.use(express.json());

// Middleware de Morgan para el registro de solicitudes
app.use(morgan('dev'));

// Función para iniciar el servidor
const startServer = () => {
  app.use('/api', mainRoute);

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
};

// Conectar a la base de datos y luego iniciar el servidor
const initApp = async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

initApp();
