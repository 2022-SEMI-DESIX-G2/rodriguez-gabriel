((utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector('#pokemon-finder-form'),
            pokemonFinderInput: document.querySelector('#input-finder-query'),
            pokemonFinderOutput: document.querySelector('#section-stats-response'),
            pokemonExceptionInput: document.querySelector('#div-exception-input'),
            pokemonCheckSprites: document.querySelector('#checkbox-sprites'),
            pokemonCheckLocation: document.querySelector('#checkbox-location'),
            pokemonCheckEvoChain: document.querySelector('#checkbox-evo-chain'),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);
        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e) => {
                e.preventDefault();
                App.htmlElements.pokemonExceptionInput.innerHTML = "";
                let msgExceptionError = '<span class="err">Este campo es obligatorio*</span>';
                const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();
                const checkSprites = App.htmlElements.pokemonCheckSprites.checked;
                const checkLocation = App.htmlElements.pokemonCheckLocation.checked;
                const checkEvoChain = App.htmlElements.pokemonCheckEvoChain.checked;
                try {
                    if (!query) {
                        App.htmlElements.pokemonExceptionInput.innerHTML = msgExceptionError;
                    } else {
                        let { data } = await utils.httpMethods.get.pokemonInfo(query);
                        data.checkSprites = checkSprites;
                        data.checkLocation = checkLocation;
                        data.checkEvoChain = checkEvoChain;
                        const renderedTemplate = App.templates.render({ data });
                        App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;

                        const pokemonButtonGeneral = document.querySelector('#button-general')
                        pokemonButtonGeneral.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#general-response'))

                        if (checkSprites) {
                            const pokemonButtonSprites = document.querySelector('#button-sprites');
                            pokemonButtonSprites.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#sprites-response'));
                        }
                        if (checkLocation) {
                            const pokemonButtonLocation = document.querySelector('#button-location');
                            pokemonButtonLocation.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#location-response'));

                        }
                        if (checkEvoChain) {
                            const pokemonButtonEvoChain = document.querySelector('#button-evo-chain');
                            pokemonButtonEvoChain.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#evo-chain-response'));
                        }
                    }
                } catch (error) {
                    App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
                }
            },
            showPokemonCard: (e, id) => {
                const hidden = 'click-button-hidden';
                const visible = 'click-button-visible';
                const divContent = document.querySelector(id);
                const listClass = divContent.classList;
    
                if (listClass.value.split(' ').includes(hidden)) {
                    divContent.classList.add(visible);
                    divContent.classList.remove(hidden);
                } else {
                    divContent.classList.add(hidden);
                    divContent.classList.remove(visible);
                }
            },
        },
        templates: {
            render: ({ searchType = 'pokemon', data }) => {
                const renderMap = {
                    pokemon: App.templates.pokemonCard,
                };
    
                return renderMap[searchType] ? renderMap[searchType](data) : Templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({pokemonName, pokemonWeight, pokemonHeight, pokemonSprites, pokemonLocations, pokemonAbilities, pokemonEvolution, checkSprites, checkLocation, checkEvoChain }) => {
                return ` <section class="container">
                <div class="container-info-form">
                    <center>
                        <h2>${pokemonName}</h2>
                    </center>
                    <button id="button-general" class="button-response">Generales del Pokemon</button>
                    <div class="data-response click-button-hidden" id="general-response">
                        <h3>Habilidades:</h3>
                        <ul>
                            ${pokemonAbilities}
                        </ul>
                        <h3>Peso:</h3>
                        <ul>
                            <li>${pokemonWeight}</li>
                        </ul>
                        <h3>Altura:</h3>
                        <ul>
                            <li>${pokemonHeight}</li>
                        </ul>
                    </div>
                    ${checkSprites ? App.templates.spritesCard(pokemonSprites) : ''}
                    ${checkLocation ? App.templates.locationCard(pokemonLocations) : ''}
                    ${checkEvoChain ? App.templates.evoChainCard(pokemonEvolution) : ''}
                </div>
            </section>`;
            },
            spritesCard: (pokemonSprites) => `<button id="button-sprites" class="button-response">Sprites del Pokemon</button>
            <div class="data-response click-button-hidden" id="sprites-response">
                ${pokemonSprites}
            </div>`,
            locationCard: (pokemonLocations) => `<button id="button-location" class="button-response">Ubicación del Pokemon</button>
            <div class="data-response click-button-hidden" id="location-response">
                <center>
                    <table>
                        <tr>
                            <td>Lugar</td>
                            <td>Probabilidad</td>
                            <td>Nivel máximo</td>
                            <td>Metodo</td>
                        </tr>
                        ${pokemonLocations}
                    </table>
                </center>
            </div>`,
            evoChainCard: (pokemonEvolution) => `<button id="button-evo-chain" class="last-button-response">Cadena de evolución del Pokemon</button>
            <div class="data-response click-button-hidden" id="evo-chain-response">
                <h3>Cadena:</h3>
                <ul>
                    ${pokemonEvolution}
                </ul>
            </div>`,
        },
    };
    App.init();
})(document.Utils);