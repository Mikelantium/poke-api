// Constantes globales
const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");
let allPokemonData = []; // Variable para almacenar los datos de todos los Pokémon

// Función para obtener los datos de todos los Pokémon
const fetchPokemon = async () => {
    for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        image: data.sprites.versions["generation-v"]["black-white"].animated
        .front_default,
        type: data.types.map((type) => type.type.name).join(", "),
        id: data.id,
      };
      allPokemonData.push(pokemon); // Almacenar los datos del Pokémon en el arreglo
    }
    displayPokemonList(allPokemonData); // Mostrar todos los Pokémon en la lista inicial
  } 


// Función para mostrar un Pokémon en la lista
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

// Función para mostrar una lista de Pokémon
const displayPokemonList = (pokemonList) => {
  pokedex.innerHTML = ""; // Limpiar la lista de Pokémon antes de mostrar nuevos resultados
  pokemonList.forEach((pokemon) => {
    displayPokemon(pokemon); // Mostrar cada Pokémon en la lista
  });
};

// Escuchador de eventos para la búsqueda de Pokémon
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemon = allPokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );
  displayPokemonList(filteredPokemon); // Mostrar solo los Pokémon filtrados según el término de búsqueda
});

fetchPokemon();
 