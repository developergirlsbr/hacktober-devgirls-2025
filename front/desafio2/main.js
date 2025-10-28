const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonContainer = document.getElementById('pokemonContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const typeColors = {
    grass: '#78C850', fire: '#F08030', water: '#6890F0',
    bug: '#A8B820', normal: '#A8A878', poison: '#A040A0',
    electric: '#F8D030', ground: '#E0C068', fairy: '#EE99AC',
    fighting: '#C03028', psychic: '#F85888', rock: '#B8A038',
    ghost: '#705898', ice: '#98D8D8', dragon: '#7038F8',
    dark: '#705848', steel: '#B8B8D0', flying: '#A890F0'
};

let offset = 0;
const limit = 20;

async function fetchPokemonList() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();
        const pokemonPromises = data.results.map(p => fetch(p.url).then(r => r.json()));
        const pokemons = await Promise.all(pokemonPromises);
        pokemons.forEach(displayPokemon);
        offset += limit;
        loadMoreBtn.style.display = 'block';
    } catch {
        pokemonContainer.innerHTML = `<p class="error">Erro ao carregar Pokémons!</p>`;
    }
}

async function fetchPokemon(name) {
    pokemonContainer.innerHTML = `<p class="loading">Carregando...</p>`;
    loadMoreBtn.style.display = 'none';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon não encontrado!");
        const data = await response.json();
        pokemonContainer.innerHTML = '';
        displayPokemon(data);
    } catch (error) {
        pokemonContainer.innerHTML = `<p class="error">❌ ${error.message}</p>`;
    }
}

function displayPokemon(pokemon) {
    const types = pokemon.types.map(t => `
        <span class="type" style="background:${typeColors[t.type.name] || '#777'}">
          ${t.type.name}
        </span>`).join('');

    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <div class="types">${types}</div>
      `;
    pokemonContainer.appendChild(card);
}

searchBtn.addEventListener('click', () => {
    const name = pokemonInput.value.trim();
    pokemonContainer.innerHTML = '';
    if (name) fetchPokemon(name);
    else {
        offset = 0;
        pokemonContainer.innerHTML = '';
        fetchPokemonList();
    }
});

pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

loadMoreBtn.addEventListener('click', fetchPokemonList);

// Carrega os primeiros 20 Pokémons ao abrir
fetchPokemonList();