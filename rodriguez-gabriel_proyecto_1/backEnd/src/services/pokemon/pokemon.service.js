const axios = require("axios").default;
const NodeCache = require("node-cache");
const { POKEAPI_ENDPOINT } = require('../../utils/endpoints');
const mapper = require('../../mappers/pokemon/pokemon.mapper');
const mapperInstance = new mapper();
const cache = new NodeCache({ stdTTL: 60*60*24*30 });

//const CACHE = {};
class PokemonService {

  async pokemonInfoService({ name } = req) {
    /*if (CACHE[name]) {
      return { data: CACHE[name], isCached: true };
    }*/
    if(cache.has(name)) {
      return { data: cache.get(name), isCached: true };
    }
    
    let response = {};
    const pokemonData = await this.#getPokemonData(name);
    const [pokemonLocation, pokemonSpecies] = await Promise.all([
      this.#getPokemonLocation(pokemonData.id),
      this.#getPokemonSpecies(pokemonData.id),
    ]);
    const pokemonEvolution = await this.#getEvolutionChain(pokemonSpecies.evolution_chain.url);
    response = mapperInstance.buildPokemonInfoResponse(pokemonData, pokemonLocation, pokemonEvolution);
    //CACHE[name] = response;
    cache.set(name, response);
    return { data: response, isCached: false };
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