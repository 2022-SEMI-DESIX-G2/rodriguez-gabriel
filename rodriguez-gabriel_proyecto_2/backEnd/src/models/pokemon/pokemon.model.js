const { Schema, model } = require('mongoose');

const PokemonSchema = Schema({
    pokemonName: {
        type: String,
        required: [true, 'Pokemon Name is required'],
    },
    pokemonAbilities: {
        type: String,
        required: [true, 'Pokemon Abilities is required']
    },
    pokemonId: {
        type: Number,
        required: [true, 'Pokemon id is required']
    },
    pokemonSprites: {
        type: String,
        required: true
    },
    pokemonLocations: {
        type: String,
        required: true
    },
    pokemonHeight: {
        type: Number,
        required: true
    },
    pokemonWeight: {
        type: Number,
        required: true
    },
    pokemonEvolution: {
        type: String,
        required: true
    },
    expirationTime: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});
module.exports = model('PokemonModel', PokemonSchema);