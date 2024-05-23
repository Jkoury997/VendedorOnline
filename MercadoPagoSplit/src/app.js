const express = require('express');
const mainRoute = require('./routes/mainRoute');
const bodyParser = require("body-parser")


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', mainRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
