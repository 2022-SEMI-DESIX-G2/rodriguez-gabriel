(() => {
    const Utils = {
        settings: {
            backendBaseUrl: "http://localhost:2020/api/pokemon",
            formattedBackendUrl: (query) => {
                return `${Utils.settings.backendBaseUrl}/${query}`;
            },
        },
        httpMethods: {
            get: {
                pokemonInfo: (query) => {
                    return Utils.fetch({
                        url: Utils.settings.formattedBackendUrl(query)
                    })
                },
            },
        },
        fetch: async ({url}) => {
            try {
                const rawResponse = await fetch(url);
                if(rawResponse.status !== 200) {
                    throw new Error(`pokemon not found`);
                }
                return rawResponse.json();
            } catch (error) {
                throw error;
            }
        },
    };
    document.Utils = Utils;
})();