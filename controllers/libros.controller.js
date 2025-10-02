const { v4: uuidv4 } = require('uuidv4');
let libros = require('../models/libros_100.json');

// GET /api/libros
exports.getAll = (req, res) => {
  res.json(libros);
};

// GET /api/libros/:id
exports.getById = (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  const libro = libros.find(l => l.id === id);
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.json(libro);
};

// POST /api/libros
exports.create = (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "titulo y autor son requeridos" });
  }
  if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
    return res.status(400).json({ error: "año inválido" });
  }
  if (libros.some(l => l.title === title && l.year === year)) {
    return res.status(400).json({ error: "El libro ya existe" });
  }
    return res.status(409).json({ error: "El titulo ya existe" });
    }

    const nuevoLibro = {    
    id: require('uuid').v4(),
    title: title,
    author: author,
    year: year
  } = req.body;
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);

// PUT /api/libros/:id
exports.update = (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  const { title, author, year } = req.body;
  if (title) {
    if (title.length < 2 || title.length > 100) {
      return res.status(400).json({ error: "titulo inválido" });
    }
    libros[index].title = title;
  }
  if (author) {
    if (author.length < 3) {
      return res.status(400).json({ error: "autor inválido" });
    }
    libros[index].author = author;
  }
  if (year) {
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      return res.status(400).json({ error: "año inválido" });
    }
    libros[index].year = year;
  }

  res.json(libros[index]);
};

// DELETE /api/libros/:id
exports.remove = (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  libros.splice(index, 1);
  res.json({ message: "Libro eliminado" });
};