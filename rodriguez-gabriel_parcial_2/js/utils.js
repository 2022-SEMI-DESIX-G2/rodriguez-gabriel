(() => {
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
            pokemonEvolutionMapper: ({species, is_baby, evolves_to}) => {
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
                const rawResponse = await fetch(url);
                if (rawResponse.status !== 200) {
                    throw new Error(`${searchType} not found`);
                }
                return rawResponse.json();
            } catch (error) {
                throw error;
            }
        },

    };
    document.Utils = Utils;
})();