const express = require('express');
const mainRoute = require('./routes/mainRoute');
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require('cors');
const connectDB = require('./database/db');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
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