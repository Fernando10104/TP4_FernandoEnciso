// API de Pokémon usando PokéAPI

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function buscarPokemon() {
    const pokemon = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado');
    
    if (pokemon === '') {
        resultado.innerHTML = '<div class="error-message">Por favor, ingresa el nombre o ID de un Pokémon.</div>';
        return;
    }
    
    // Mostrar loading
    resultado.innerHTML = '<div class="loading">⚡ Buscando Pokémon...</div>';
    
    try {
        const response = await fetch(`${BASE_URL}/${pokemon}`);
        
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        
        const data = await response.json();
        mostrarResultado(data);
        
    } catch (error) {
        resultado.innerHTML = `
            <div class="error-message">
                ❌ Error: No se pudo encontrar el Pokémon. 
                Verifica el nombre o número e intenta nuevamente.
            </div>
        `;
    }
}

function mostrarResultado(data) {
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const id = data.id;
    const imagen = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    const tipos = data.types.map(t => t.type.name).join(', ');
    const peso = (data.weight / 10).toFixed(1); // Convertir a kg
    const altura = (data.height / 10).toFixed(1); // Convertir a metros
    const habilidades = data.abilities.map(a => a.ability.name).join(', ');
    const experiencia = data.base_experience;
    
    // Obtener estadísticas
    const stats = data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
    }));
    
    // Colores por tipo
    const tipoColores = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };
    
    const tiposPrimario = data.types[0].type.name;
    const colorTipo = tipoColores[tiposPrimario] || '#667eea';
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <div style="background: linear-gradient(135deg, ${colorTipo}40, ${colorTipo}20); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <img src="${imagen}" alt="${nombre}" style="max-width: 300px;">
            </div>
            
            <h3>${nombre}</h3>
            <p style="opacity: 0.7; font-size: 1.2em; margin-bottom: 20px;">N° ${id}</p>
            
            <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;">
                ${data.types.map(t => `
                    <span class="badge" style="background: ${tipoColores[t.type.name] || '#667eea'}">
                        ${t.type.name.toUpperCase()}
                    </span>
                `).join('')}
            </div>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>⚖️ Peso</strong>
                    <span>${peso} kg</span>
                </div>
                
                <div class="info-item">
                    <strong>📏 Altura</strong>
                    <span>${altura} m</span>
                </div>
                
                <div class="info-item">
                    <strong>🎯 Tipo</strong>
                    <span>${tipos}</span>
                </div>
                
                <div class="info-item">
                    <strong>⭐ Experiencia Base</strong>
                    <span>${experiencia}</span>
                </div>
                
                <div class="info-item" style="grid-column: 1 / -1;">
                    <strong>✨ Habilidades</strong>
                    <span>${habilidades}</span>
                </div>
            </div>
            
            <div style="margin-top: 30px; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px;">
                <h4 style="color: var(--accent-color); margin-bottom: 20px; text-align: center;">📊 Estadísticas Base</h4>
                ${stats.map(stat => `
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="text-transform: capitalize;">${stat.name.replace('-', ' ')}</span>
                            <span style="font-weight: bold; color: var(--accent-color);">${stat.value}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, ${colorTipo}, var(--accent-color)); height: 100%; width: ${(stat.value / 255) * 100}%; border-radius: 5px; transition: width 0.3s;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Permitir buscar con Enter
document.getElementById('pokemonInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});
