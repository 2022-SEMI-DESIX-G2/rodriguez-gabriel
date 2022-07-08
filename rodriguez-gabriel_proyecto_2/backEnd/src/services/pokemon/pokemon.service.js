const axios = require("axios").default;
const { POKEAPI_ENDPOINT } = require('../../utils/endpoints');
const mapper = require('../../mappers/pokemon/pokemon.mapper');
const mapperInstance = new mapper();
const PokemonModel = require('../../models/pokemon/pokemon.model');
class PokemonService {

  async pokemonInfoService({ name } = req) {
    const date = new Date();
    const currentTime = date.getTime();
    const cacheExpiration = date.getTime() + (60 * 60 * 24 * 30 * 1000);
    const pokemonInfoDb = await PokemonModel.findOne({ pokemonName: name }).exec();
    if(pokemonInfoDb) {
      const { expirationTime } = pokemonInfoDb;
      if(currentTime >= expirationTime) {
        await PokemonModel.findOneAndDelete(name)
      } else {
        return { data: pokemonInfoDb, isCached: true };
      }
    }

    let response = {};
    const pokemonData = await this.#getPokemonData(name);
    const [pokemonLocation, pokemonSpecies] = await Promise.all([
      this.#getPokemonLocation(pokemonData.id),
      this.#getPokemonSpecies(pokemonData.id),
    ]);
    const pokemonEvolution = await this.#getEvolutionChain(pokemonSpecies.evolution_chain.url);
    response = mapperInstance.buildPokemonInfoResponse(pokemonData, pokemonLocation, pokemonEvolution);
    response['expirationTime'] = cacheExpiration;
    response['timestamp'] = currentTime;
    const pokemon = new PokemonModel(response);
    await pokemon.save();
    return { data: pokemon, isCached: false };
  }
  async #getPokemonData(value) {
    const { data } = await axios.get(`${POKEAPI_ENDPOINT}/pokemon/${value}`);
    return data;
  }
  async #getPokemonLocation(value) {
    const { data } = await axios.get(`${POKEAPI_ENDPOINT}/pokemon/${value}/encounters`);
    return data;
  }
  async #getPokemonSpecies(value) {
    const { data } = await axios.get(`${POKEAPI_ENDPOINT}/pokemon-species/${value}`);
    return data;
  }
  async #getEvolutionChain(value) {
    const { data } = await axios.get(`${value}`);
    return data;
  }

}
module.exports = PokemonService;