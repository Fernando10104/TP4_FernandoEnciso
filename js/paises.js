// API de Países usando REST Countries

const BASE_URL = 'https://restcountries.com/v3.1';

async function buscarPais() {
    const pais = document.getElementById('countryInput').value.trim();
    const resultado = document.getElementById('resultado');
    
    if (pais === '') {
        resultado.innerHTML = '<div class="error-message">Por favor, ingresa el nombre de un país.</div>';
        return;
    }
    
    // Mostrar loading
    resultado.innerHTML = '<div class="loading">🌍 Buscando información del país...</div>';
    
    try {
        const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(pais)}?fullText=false`);
        
        if (!response.ok) {
            throw new Error('País no encontrado');
        }
        
        const data = await response.json();
        mostrarResultado(data[0]); // Tomamos el primer resultado
        
    } catch (error) {
        resultado.innerHTML = `
            <div class="error-message">
                ❌ Error: No se pudo encontrar el país. 
                Verifica el nombre e intenta nuevamente.
            </div>
        `;
    }
}

function mostrarResultado(data) {
    const nombre = data.name.common;
    const nombreOficial = data.name.official;
    const capital = data.capital ? data.capital[0] : 'N/A';
    const poblacion = data.population.toLocaleString('es-ES');
    const bandera = data.flags.svg;
    const region = data.region;
    const subregion = data.subregion || 'N/A';
    const area = data.area ? data.area.toLocaleString('es-ES') : 'N/A';
    const idiomas = data.languages ? Object.values(data.languages).join(', ') : 'N/A';
    const monedas = data.currencies ? Object.values(data.currencies).map(c => c.name).join(', ') : 'N/A';
    const continente = data.continents ? data.continents.join(', ') : 'N/A';
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <img src="${bandera}" alt="Bandera de ${nombre}" style="max-width: 400px; border: 3px solid rgba(255,255,255,0.2);">
            <h3>${nombre}</h3>
            <p style="opacity: 0.8; font-style: italic;">${nombreOficial}</p>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>🏛️ Capital</strong>
                    <span>${capital}</span>
                </div>
                
                <div class="info-item">
                    <strong>👥 Población</strong>
                    <span>${poblacion}</span>
                </div>
                
                <div class="info-item">
                    <strong>🌎 Continente</strong>
                    <span>${continente}</span>
                </div>
                
                <div class="info-item">
                    <strong>📍 Región</strong>
                    <span>${region}</span>
                </div>
                
                <div class="info-item">
                    <strong>🗺️ Subregión</strong>
                    <span>${subregion}</span>
                </div>
                
                <div class="info-item">
                    <strong>📏 Área</strong>
                    <span>${area} km²</span>
                </div>
                
                <div class="info-item">
                    <strong>💬 Idiomas</strong>
                    <span>${idiomas}</span>
                </div>
                
                <div class="info-item">
                    <strong>💰 Moneda</strong>
                    <span>${monedas}</span>
                </div>
            </div>
        </div>
    `;
}

// Permitir buscar con Enter
document.getElementById('countryInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarPais();
    }
});
