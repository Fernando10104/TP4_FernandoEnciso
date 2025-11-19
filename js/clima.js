// API del Clima usando OpenWeather
// Si OpenWeather no funciona, usa tu propia API key de https://openweathermap.org/api

const API_KEY = '01ba0c41c462903702793a25fd7118cd'; // API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// API alternativa sin key (menos datos pero funcional)
const BACKUP_URL = 'https://wttr.in';

async function buscarClima() {
    const ciudad = document.getElementById('cityInput').value.trim();
    const resultado = document.getElementById('resultado');
    
    if (ciudad === '') {
        resultado.innerHTML = '<div class="error-message">Por favor, ingresa el nombre de una ciudad.</div>';
        return;
    }
    
    // Mostrar loading
    resultado.innerHTML = '<div class="loading">🌍 Buscando información del clima...</div>';
    
    try {
        // Intentar con OpenWeather primero
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`);
        
        if (!response.ok) {
            // Si OpenWeather falla, intentar con API de respaldo
            console.log('OpenWeather falló, intentando API de respaldo...');
            await buscarClimaBackup(ciudad);
            return;
        }
        
        const data = await response.json();
        mostrarResultado(data);
        
    } catch (error) {
        console.error('Error con OpenWeather:', error);
        // Intentar con API de respaldo
        await buscarClimaBackup(ciudad);
    }
}

// Función de respaldo usando wttr.in
async function buscarClimaBackup(ciudad) {
    const resultado = document.getElementById('resultado');
    
    try {
        const response = await fetch(`${BACKUP_URL}/${encodeURIComponent(ciudad)}?format=j1`);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        
        const data = await response.json();
        mostrarResultadoBackup(data, ciudad);
        
    } catch (error) {
        resultado.innerHTML = `
            <div class="error-message">
                ❌ Error: No se pudo obtener información del clima. 
                <br><br>
                <strong>Posibles soluciones:</strong><br>
                1. Verifica el nombre de la ciudad<br>
                2. Obtén tu propia API key gratuita en <a href="https://openweathermap.org/api" target="_blank" style="color: var(--accent-color);">OpenWeather</a><br>
                3. Reemplaza la API_KEY en js/clima.js
            </div>
        `;
    }
}

function mostrarResultadoBackup(data, ciudad) {
    const current = data.current_condition[0];
    const temperatura = current.temp_C;
    const sensacion = current.FeelsLikeC;
    const humedad = current.humidity;
    const descripcion = current.lang_es ? current.lang_es[0].value : current.weatherDesc[0].value;
    const viento = (parseFloat(current.windspeedKmph) / 3.6).toFixed(1); // Convertir a m/s
    const presion = current.pressure;
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <div style="font-size: 5em; margin: 20px 0;">☁️</div>
            <h3>${ciudad}</h3>
            <p style="opacity: 0.7; font-size: 0.9em; margin-bottom: 20px;">
                ⚠️ Usando API alternativa (OpenWeather no disponible)
            </p>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>🌡️ Temperatura</strong>
                    <span>${temperatura}°C</span>
                </div>
                
                <div class="info-item">
                    <strong>🤚 Sensación Térmica</strong>
                    <span>${sensacion}°C</span>
                </div>
                
                <div class="info-item">
                    <strong>💧 Humedad</strong>
                    <span>${humedad}%</span>
                </div>
                
                <div class="info-item">
                    <strong>☁️ Descripción</strong>
                    <span>${descripcion}</span>
                </div>
                
                <div class="info-item">
                    <strong>💨 Viento</strong>
                    <span>${viento} m/s</span>
                </div>
                
                <div class="info-item">
                    <strong>📊 Presión</strong>
                    <span>${presion} hPa</span>
                </div>
            </div>
        </div>
    `;
}

function mostrarResultado(data) {
    const temperatura = Math.round(data.main.temp);
    const sensacion = Math.round(data.main.feels_like);
    const humedad = data.main.humidity;
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;
    const ciudad = data.name;
    const pais = data.sys.country;
    const viento = data.wind.speed;
    const presion = data.main.pressure;
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <img src="https://openweathermap.org/img/wn/${icono}@4x.png" alt="${descripcion}">
            <h3>${ciudad}, ${pais}</h3>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>🌡️ Temperatura</strong>
                    <span>${temperatura}°C</span>
                </div>
                
                <div class="info-item">
                    <strong>🤚 Sensación Térmica</strong>
                    <span>${sensacion}°C</span>
                </div>
                
                <div class="info-item">
                    <strong>💧 Humedad</strong>
                    <span>${humedad}%</span>
                </div>
                
                <div class="info-item">
                    <strong>☁️ Descripción</strong>
                    <span>${descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</span>
                </div>
                
                <div class="info-item">
                    <strong>💨 Viento</strong>
                    <span>${viento} m/s</span>
                </div>
                
                <div class="info-item">
                    <strong>📊 Presión</strong>
                    <span>${presion} hPa</span>
                </div>
            </div>
        </div>
    `;
}

// Permitir buscar con Enter
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarClima();
    }
});
