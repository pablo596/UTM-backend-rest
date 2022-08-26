// Se requiere el paquete para la utilización de PostgreSQL
const { Pool } = require('pg');

// Objeto para la configuración de la conexión a la BD
const config = {
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
};
console.log(config);
// Creación de la instancia para la conexión a laa BD
const pool = new Pool(config);

// Funciones para los controles y métodos que se van implementar en el CRUD
// Obtención de juegos
const getGames = async (req, res) => {
  const response = await pool.query('SELECT * FROM games');
  res.status(200).json(response.rows);
};

// Obtención de Juego por ID
const getGameById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
  res.json(response.rows);
};

// Creación de juego
const createGame = async (req, res) => {
  const {
    title,
    company,
    qualification,
    genre,
    multiplayer,
    platform,
    releaseDate,
  } = req.body;

  const response = await pool.query(
    'Insert INTO games (title,company,qualification,genre,multiplayer,platform,release_date) VALUES ($1,$2,$3,$4,$5,$6,$7)',
    [title, company, qualification, genre, multiplayer, platform, releaseDate]
  );
  res.json({
    message: `Game ${title} added successfully`,
    body: { game: { ...req.body } },
  });
};

// Actualización de juego
const updateGame = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    company,
    qualification,
    genre,
    multiplayer,
    platform,
    releaseDate,
  } = req.body;
  const length = Object.keys(req.body).length;
  const queryString = ['UPDATE games set'];
  const queryValues = [];
  let variables = 0;
  if (title) {
    variables++;
    queryString.push(`title = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(title);
  }
  if (company) {
    variables++;
    queryString.push(`company = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(company);
  }
  if (qualification) {
    variables++;
    queryString.push(`qualification = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(qualification);
  }
  if (genre) {
    variables++;
    queryString.push(`genre = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(genre);
  }
  if (multiplayer) {
    variables++;
    queryString.push(`multiplayer = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(multiplayer === 'true');
  }
  if (platform) {
    variables++;
    queryString.push(`platform = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(platform);
  }
  if (releaseDate) {
    variables++;
    queryString.push(`release_date = $${variables}`);
    if (variables < length) {
      queryString.push(',');
    }
    queryValues.push(releaseDate);
  }
  const idNum = variables + 1;
  queryString.push(`WHERE id = $${idNum}`);
  queryValues.push(id);
  const response = await pool.query(queryString.join(' '), queryValues);
  console.log(response);
  res.json({
    message: 'Game updated successfully',
    body: { game: { id, ...req.body } },
  });
};

// Eliminación de juego
const deleteGame = async (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM games WHERE id = $1', [id]);
  res.json({ message: `Game ${id} deleted successfully` });
};
module.exports = {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
};
