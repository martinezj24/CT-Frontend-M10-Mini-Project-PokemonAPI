document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemon-info');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const pokemon = await response.json();
        pokemonInfoDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <p class="card-text">ID: ${pokemon.id}</p>
                    <p class="card-text">Height: ${pokemon.height}</p>
                    <p class="card-text">Weight: ${pokemon.weight}</p>
                    <a href="details.html?id=${pokemon.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
    } catch (error) {
        pokemonInfoDiv.innerHTML = '<p class="text-danger">Pokémon not found. Please try again.</p>';
    }
});

