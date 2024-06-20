document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const pokemonDetailsDiv = document.getElementById('pokemon-details');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const pokemon = await response.json();

        pokemonDetailsDiv.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                </div>
                <div class="card-body">
                    <img src="${pokemon.sprites.front_default}" class="img-fluid mb-3">
                    <h5>Abilities</h5>
                    <ul class="list-group mb-3">
                        ${pokemon.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                    </ul>
                    <h5>Types</h5>
                    <ul class="list-group mb-3">
                        ${pokemon.types.map(type => `<li class="list-group-item">${type.type.name}</li>`).join('')}
                    </ul>
                    <h5>Stats</h5>
                    <ul class="list-group">
                        ${pokemon.stats.map(stat => `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } catch (error) {
        pokemonDetailsDiv.innerHTML = '<p class="text-danger">Pokémon details not found. Please try again.</p>';
    }
});
