// Constantes globales.
const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");
let allPokemonData = []; // Variable para almacenar los datos de todos los Pokémon.

// Función para obtener los datos de los Pokémon.
const fetchPokemon = async () => {
  const pokemons = [];
  for (let i = 1; i <= 150; i++) {
    const pokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemonsJson = await pokemonsResponse.json();
    pokemons.push(pokemonsJson);
  }
  return pokemons;
};

const initializeApp = async () => {
  
    const pokemons = await fetchPokemon();
    allPokemonData = mappedPokemons(pokemons);
    displayPokemonList(allPokemonData); // Mostrar todos los Pokémon en la lista inicial.
};

const mappedPokemons = (pokemons) => {
  const mapPokemons = pokemons.map((data) => ({
    name: data.name,
    image: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
    type: data.types.map((type) => type.type.name).join(", "),
    id: data.id,
  }));
  return mapPokemons;
};

// Función para mostrar un Pokémon en la lista.
const displayPokemon = (pokemon) => {
  const pokemonElement = document.createElement("li");
  pokemonElement.classList.add("card");
  pokemonElement.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}" />
    <h3>${pokemon.name}</h3>
    <p>Type: ${pokemon.type}</p>
    <p>ID: ${pokemon.id}</p>
  `;
  pokedex.appendChild(pokemonElement);
};

// Función para mostrar una lista de Pokémon.
const displayPokemonList = (pokemonList) => {
  pokedex.innerHTML = ""; // Limpiar la lista de Pokémon antes de mostrar nuevos resultados.
  pokemonList.forEach((pokemon) => {
    displayPokemon(pokemon); // Mostrar cada Pokémon en la lista.
  });
};

// Escuchador de eventos para la búsqueda de Pokémon.
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemon = allPokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );
  displayPokemonList(filteredPokemon); 
});

initializeApp();
