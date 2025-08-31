const pokemonList = document.getElementById('pokemonList')
const typeFilter =document.getElementById('typeFilter')

const maxRecords = 151
let totalPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(t => `<li class="type ${t}">${t}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function renderPokemons(pokemons) {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
}

function loadAllPokemons() {
    pokeApi.getPokemons(0, maxRecords).then(pokemons => {
        totalPokemons = pokemons;
        renderPokemons(totalPokemons);
    });
}

typeFilter.addEventListener('change', () => {
    const selectedType = typeFilter.value;

    if (selectedType === "") {
        renderPokemons(totalPokemons);
    } else {
        const filtered = totalPokemons.filter(pokemon =>
            pokemon.types.includes(selectedType)
        );
        renderPokemons(filtered);
    }
});

loadAllPokemons();

