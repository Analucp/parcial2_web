const express = require('express');
const logger = require('./middlewares/logger');
const librosRoutes = require('./routes/libros.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/api/libros', librosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
