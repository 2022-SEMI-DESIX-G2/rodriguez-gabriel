const { Router } = require('express');
const { POKEMON_ENDPOINT } = require('../../utils/endpoints')
const controller = require('../../controllers/pokemon/pokemon.controller');

const router = Router()
.get(POKEMON_ENDPOINT + "/:name", controller.pokemonInfo)

module.exports = router;