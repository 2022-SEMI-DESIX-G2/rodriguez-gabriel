const service = require('../../services/pokemon/pokemon.service');
const serviceInstance = new service();

exports.pokemonInfo = async function(req, res) {
    try {
        const pokemonData = await serviceInstance.pokemonInfoService( req.params );
        return res.status(200).send( pokemonData );
    } catch (err) {
        res.status(500).send(err);
    }

}