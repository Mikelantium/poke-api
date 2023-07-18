const pokedex = document.getElementById("pokedex");

const fetchPokemon = async () => {
  for (let i = 1; i <= 150; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    const pokemon = {
      name: data.name,
      image:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      type: data.types.map((type) => type.type.name).join(", "),
      id: data.id,
    };
    displayPokemon(pokemon);
  }
};

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

fetchPokemon();

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchPokemon(searchTerm);
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchPokemon(searchTerm);
});

const searchPokemon = async (term) => {
  pokedex.innerHTML = ""; // Limpiar la lista de Pokémon antes de realizar una nueva búsqueda

  if (term === "") {
    // Si el término de búsqueda está vacío, mostrar todos los Pokémon nuevamente
    fetchPokemon();
    return;
  }

  try {
    for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        type: data.types.map((type) => type.type.name).join(", "),
        id: data.id,
      };

      if (pokemon.name.includes(term)) {
        displayPokemon(pokemon);
      }
    }
  } catch (error) {
    console.log("Pokémon no encontrado");
  }
};
