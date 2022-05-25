const axios = require("axios");

const Utils = {
    settings: {
        backendBaseUrl: "https://pokeapi.co/api/v2",
        formattedBackendUrl: ({ query, searchType }) => {
            return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
        },
    },
    httpMethods: {
        get: {
            pokemonInfo: ({ query, searchType = "pokemon" }) => {
                return Utils.fetch({
                    url: Utils.settings.formattedBackendUrl({ query, searchType }), searchType,
                });
            },
            pokemonSpecies: ({ speciesUrl, searchType = "species" }) => {
                return Utils.fetch({
                    url: speciesUrl, searchType,
                });
            },
            pokemonEvolution: ({ evolutionUrl, searchType = "evolutions" }) => {
                return Utils.fetch({
                    url: evolutionUrl, searchType,
                })
            },
        },
    },
    mapper: {
        pokemonEvolutionMapper: ({ species, is_baby, evolves_to }) => {
            let evolutionArray = [];
            evolutionArray.push({ name: species.name, is_baby: is_baby });
            while (evolves_to.length > 0) {
                if (evolves_to.length > 1) {
                    evolves_to.forEach(({ species, is_baby }) => {
                        evolutionArray.push({ name: species.name, is_baby: is_baby });
                    });
                } else {
                    evolutionArray.push({ name: evolves_to[0].species.name, is_baby: evolves_to[0].is_baby });
                }
                evolves_to = evolves_to[0].evolves_to
            }
            return evolutionArray;
        },
    },
    fetch: async ({ url, searchType }) => {
        try {
            const rawResponse = await axios(url);
            if (rawResponse.status !== 200) {
                throw new Error(`${searchType} not found`);
            }
            return rawResponse.data;
        } catch (error) {
            throw error;
        }
    },
};

const main = async () => {
    const query = "pikachu";
    const searchType = "pokemon";
    const pokemonResponse = await Utils.httpMethods.get.pokemonInfo({ query, searchType });
    let abilitiesList = pokemonResponse.abilities.map(({ ability, is_hidden }) => `${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}${is_hidden ? " (HIDDEN)" : ""}, `)
    const speciesUrl = pokemonResponse.species.url;
    const speciesResponse = await Utils.httpMethods.get.pokemonSpecies({ speciesUrl, searchType });
    const evolutionUrl = speciesResponse.evolution_chain.url;
    const { chain } = await Utils.httpMethods.get.pokemonEvolution({ evolutionUrl, searchType });
    pokemonResponse['evolutionChain'] = Utils.mapper.pokemonEvolutionMapper(chain);
    let evolutionsList = pokemonResponse.evolutionChain.map(({ name }) => `${name.charAt(0).toUpperCase() + name.slice(1)}, `)
    console.log("Nombre:      " + pokemonResponse.name);
    console.log("Id:          " + pokemonResponse.id);
    console.log("Altura/Peso: " + pokemonResponse.weight + " / " + pokemonResponse.height);
    console.log("Habilidades: " + abilitiesList.join(""));
    console.log("Evoluciones: " + evolutionsList.join(""));
    return pokemonResponse;
};
main();
