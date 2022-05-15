((utils) => {
  const App = {
    htmlElements: {
      pokemonFinderForm: document.querySelector("#pokemonFinderForm"),
      pokemonFinderSearchType: document.querySelector("#pokemonFinderSearchType"),
      pokemonFinderInput: document.querySelector("#pokemonFinderQuery"),
      pokemonFinderOutput: document.querySelector("#pokemonFinderResponse"),
      pokemonFinderCleanButton: document.querySelector('#cleanButtonId'),
      pokemonFinderButtonsSection: document.querySelector('#pokemonSearchButtons'),
    },
    init: () => {
      App.htmlElements.pokemonFinderForm.addEventListener("submit", App.handlers.pokemonFinderFormOnSubmit);
      App.htmlElements.pokemonFinderCleanButton.addEventListener('click', App.handlers.pokemonFinderCleanButtonOnClick)
    },
    handlers: {
      pokemonFinderFormOnSubmit: async (e) => {
        e.preventDefault();
        const query = App.htmlElements.pokemonFinderInput.value;
        const searchType = App.htmlElements.pokemonFinderSearchType.value;
        try {
          const pokemonResponse = await utils.httpMethods.get.pokemonInfo({ query, searchType });
          if (searchType === 'pokemon') {
            const speciesUrl = pokemonResponse.species.url;
            const speciesResponse = await utils.httpMethods.get.pokemonSpecies({ speciesUrl, searchType });
            const evolutionUrl = speciesResponse.evolution_chain.url;
            const { chain } = await utils.httpMethods.get.pokemonEvolution({ evolutionUrl, searchType });
            pokemonResponse['evolutionChain'] = utils.mapper.pokemonEvolutionMapper(chain);
          }
          const renderedTemplate = App.templates.render({ searchType, pokemonResponse });
          App.htmlElements.pokemonFinderButtonsSection.className += " AllButtons"
          App.htmlElements.pokemonFinderCleanButton.className += " ShowButton"
          App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
        } catch (error) {
          App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
        }
      },
      pokemonFinderCleanButtonOnClick: () => {
        App.htmlElements.pokemonFinderInput.value = '';
        App.htmlElements.pokemonFinderSearchType.value = 'default';
        App.htmlElements.pokemonFinderOutput.innerHTML = '';
        App.htmlElements.pokemonFinderButtonsSection.classList.remove('AllButtons');
        App.htmlElements.pokemonFinderCleanButton.classList.remove('ShowButton')
      },
    },
    templates: {
      render: ({ searchType, pokemonResponse }) => {
        const renderMap = {
          ability: App.templates.abilityCard,
          pokemon: App.templates.pokemonCard,
        };
        return renderMap[searchType]
          ? renderMap[searchType](pokemonResponse)
          : App.templates.errorCard();
      },
      errorCard: () => `<h1>There was an error</h1>`,
      pokemonCard: ({ id, name, weight, height, sprites, abilities, evolutionChain }) => {
        let { back_default, front_default } = sprites;
        let abilitiesList = abilities.map(({ ability, is_hidden }) => `<li class="abilityList">${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)} ${is_hidden ? '<img class="hiddenLogo" src="images/hiddenLogo.svg" alt="hiddenLogo">' : ""}</li>`)
        let evolutionsList = evolutionChain.map(({ name, is_baby }) => `<li class="evolutionList">${name.charAt(0).toUpperCase() + name.slice(1)} ${is_baby ? '<img class="babyLogo" src="images/babyLogo.svg" alt="babyLogo">' : ""}</li>`)
        return `
        <section class="containerPokemonCard">
        <h3>${name.charAt(0).toUpperCase() + name.slice(1)} (${id})</h3>
          <section class="containerPokemonBothSides">
            <section class="pokemonCardLeftSide">
              <h4>Sprites</h4>
              <img class="sprites" src=${front_default} alt="frontImageDefault">
              <img class="sprites spritesTwo" src=${back_default} alt="backImageDefault">
              <h4 class="evolutionChainContainer">Evolution chain</h4>
              <ul class="evolutionChain">
               ${evolutionsList.join("")}
              </ul>
            </section>
            <section class="pokemonCardRightSide">
              <h4>Weight/Height</h4>
              <p class="weightHeight">${weight} / ${height}</p>
              <h4 class="abilitiesListContainer">Abilities</h4>
              <ul class="abilitiesList">
                ${abilitiesList.join("")}
              </ul>
            </section>
          </section>
        </section>`;
      },
      abilityCard: ({ name, pokemon }) => {
        const pokemonList = pokemon.map(
          ({ pokemon, is_hidden }) =>
            `<li class="pokemonList">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} ${is_hidden ? '<img class="hiddenLogo" src="images/hiddenLogo.svg" alt="hiddenLogo">' : ""}</li>`
        );
        return `
        <section class="containerAbilityCard">
          <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
          <h4>Who can learn it?</h4>
          <ul class="pokemonListContainer">
            ${pokemonList.join("")}
          </ul>
        </section>`;
      },
    },
  };
  App.init();
})(document.Utils);
