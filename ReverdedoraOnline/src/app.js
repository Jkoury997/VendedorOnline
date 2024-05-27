const express = require('express');

const morgan = require("morgan")
const cors = require('cors');
const connectDB = require('./database/db');


const app = express();
const mainRoute = require("./routes/mainRouter")

app.use(cors());

const PORT = process.env.PORT || 3004;


// Middleware para parsear JSON
app.use(express.json());

// Middleware de Morgan para el registro de solicitudes
app.use(morgan('dev'));

// Conectar a MongoDB y luego iniciar el servidor
connectDB().then(() => {
  app.use('/api', mainRoute);

  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
});
