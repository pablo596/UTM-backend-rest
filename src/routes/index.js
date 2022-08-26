const { Router } = require('express');
const router = Router();
// Router para manejo de rutas
const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/index.controllers');

router.get('/games', getGames);
router.get('/games/:id', getGameById);
router.post('/games', createGame);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);

module.exports = router;
