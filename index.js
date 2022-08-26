const express = require('express');
const app = express();
require('dotenv').config();

// midlewares
app.use(express.json());

// routes
app.use(require('./src/routes/index'));

// Puerto que se va a utilizar
const port = process.env.APPPORT;

// escucha del back
app.listen(port, () => {
  console.log(`Backend ejecutandose en http://localhost:${port}`);
});
