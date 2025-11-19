// API de Rick & Morty

const BASE_URL = 'https://rickandmortyapi.com/api/character';

async function buscarPersonaje() {
    const id = document.getElementById('characterInput').value.trim();
    const resultado = document.getElementById('resultado');
    
    if (id === '' || id < 1 || id > 826) {
        resultado.innerHTML = '<div class="error-message">Por favor, ingresa un ID válido entre 1 y 826.</div>';
        return;
    }
    
    // Mostrar loading
    resultado.innerHTML = '<div class="loading">🛸 Buscando personaje en el multiverso...</div>';
    
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Personaje no encontrado');
        }
        
        const data = await response.json();
        mostrarResultado(data);
        
    } catch (error) {
        resultado.innerHTML = `
            <div class="error-message">
                ❌ Error: No se pudo encontrar el personaje. 
                Intenta con otro ID.
            </div>
        `;
    }
}

function buscarAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 826) + 1;
    document.getElementById('characterInput').value = idAleatorio;
    buscarPersonaje();
}

function mostrarResultado(data) {
    const nombre = data.name;
    const imagen = data.image;
    const estado = data.status;
    const especie = data.species;
    const genero = data.gender;
    const origen = data.origin.name;
    const ubicacion = data.location.name;
    const tipo = data.type || 'N/A';
    const episodios = data.episode.length;
    
    // Colores según el estado
    const estadoColores = {
        'Alive': '#4ade80',
        'Dead': '#ef4444',
        'unknown': '#fbbf24'
    };
    
    const estadoColor = estadoColores[estado] || '#fbbf24';
    
    // Emojis según el estado
    const estadoEmojis = {
        'Alive': '✅',
        'Dead': '💀',
        'unknown': '❓'
    };
    
    const estadoEmoji = estadoEmojis[estado] || '❓';
    
    // Traducción de términos
    const estadoEs = {
        'Alive': 'Vivo',
        'Dead': 'Muerto',
        'unknown': 'Desconocido'
    };
    
    const generoEs = {
        'Male': 'Masculino',
        'Female': 'Femenino',
        'Genderless': 'Sin género',
        'unknown': 'Desconocido'
    };
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <div style="background: linear-gradient(135deg, #00b5cc40, #97ce4c40); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <img src="${imagen}" alt="${nombre}" style="max-width: 300px; border-radius: 15px; border: 4px solid rgba(255,255,255,0.3);">
            </div>
            
            <h3>${nombre}</h3>
            <p style="opacity: 0.7; font-size: 1.2em; margin-bottom: 20px;">ID: ${data.id}</p>
            
            <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;">
                <span class="badge" style="background: ${estadoColor}">
                    ${estadoEmoji} ${estadoEs[estado] || estado}
                </span>
                <span class="badge" style="background: linear-gradient(135deg, #667eea, #764ba2)">
                    ${especie}
                </span>
            </div>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>👤 Nombre</strong>
                    <span>${nombre}</span>
                </div>
                
                <div class="info-item">
                    <strong>💓 Estado</strong>
                    <span style="color: ${estadoColor}; font-weight: bold;">
                        ${estadoEmoji} ${estadoEs[estado] || estado}
                    </span>
                </div>
                
                <div class="info-item">
                    <strong>🧬 Especie</strong>
                    <span>${especie}</span>
                </div>
                
                <div class="info-item">
                    <strong>⚧ Género</strong>
                    <span>${generoEs[genero] || genero}</span>
                </div>
                
                <div class="info-item">
                    <strong>🏷️ Tipo</strong>
                    <span>${tipo}</span>
                </div>
                
                <div class="info-item">
                    <strong>📺 Episodios</strong>
                    <span>${episodios}</span>
                </div>
                
                <div class="info-item" style="grid-column: 1 / -1;">
                    <strong>🌍 Origen</strong>
                    <span>${origen}</span>
                </div>
                
                <div class="info-item" style="grid-column: 1 / -1;">
                    <strong>📍 Última Ubicación</strong>
                    <span>${ubicacion}</span>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <button class="btn" onclick="buscarAleatorio()" style="width: 100%;">
                    🎲 Buscar otro personaje aleatorio
                </button>
            </div>
        </div>
    `;
}

// Permitir buscar con Enter
document.getElementById('characterInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarPersonaje();
    }
});
