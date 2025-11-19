// API de Criptomonedas usando CoinGecko

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function buscarCripto() {
    const cryptoId = document.getElementById('cryptoSelect').value;
    const resultado = document.getElementById('resultado');
    
    // Mostrar loading
    resultado.innerHTML = '<div class="loading">💰 Obteniendo cotización...</div>';
    
    try {
        // Obtener datos de la criptomoneda
        const response = await fetch(`${BASE_URL}/coins/${cryptoId}?localization=false&tickers=false&community_data=false&developer_data=false`);
        
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        mostrarResultado(data);
        
    } catch (error) {
        resultado.innerHTML = `
            <div class="error-message">
                ❌ Error: No se pudo obtener la información de la criptomoneda.
                Intenta nuevamente más tarde.
            </div>
        `;
    }
}

function mostrarResultado(data) {
    const nombre = data.name;
    const simbolo = data.symbol.toUpperCase();
    const imagen = data.image.large;
    const precioUSD = data.market_data.current_price.usd;
    const cambio24h = data.market_data.price_change_percentage_24h;
    const marketCap = data.market_data.market_cap.usd;
    const volumen24h = data.market_data.total_volume.usd;
    const precioMaximo24h = data.market_data.high_24h.usd;
    const precioMinimo24h = data.market_data.low_24h.usd;
    const suministroCirculante = data.market_data.circulating_supply;
    const rank = data.market_cap_rank;
    
    // Determinar color según el cambio
    const cambioColor = cambio24h >= 0 ? '#4ade80' : '#ef4444';
    const cambioIcono = cambio24h >= 0 ? '📈' : '📉';
    
    // Formatear números
    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        }).format(precio);
    };
    
    const formatearNumero = (numero) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numero);
    };
    
    const formatearSupply = (numero) => {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numero);
    };
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <div class="result-card">
            <div style="background: linear-gradient(135deg, #f093fb40, #f5576c40); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <img src="${imagen}" alt="${nombre}" style="max-width: 150px;">
            </div>
            
            <h3>${nombre} (${simbolo})</h3>
            <p style="opacity: 0.7; font-size: 1.1em; margin-bottom: 10px;">Rank: #${rank}</p>
            
            <div style="margin: 30px 0;">
                <div style="font-size: 3em; font-weight: bold; color: var(--accent-color); margin-bottom: 10px;">
                    ${formatearPrecio(precioUSD)}
                </div>
                <div style="font-size: 1.5em; color: ${cambioColor}; font-weight: bold;">
                    ${cambioIcono} ${cambio24h >= 0 ? '+' : ''}${cambio24h.toFixed(2)}%
                    <span style="font-size: 0.7em; opacity: 0.8;">(24h)</span>
                </div>
            </div>
            
            <div class="result-info">
                <div class="info-item">
                    <strong>💵 Precio en USD</strong>
                    <span>${formatearPrecio(precioUSD)}</span>
                </div>
                
                <div class="info-item">
                    <strong>${cambioIcono} Cambio 24h</strong>
                    <span style="color: ${cambioColor}; font-weight: bold;">
                        ${cambio24h >= 0 ? '+' : ''}${cambio24h.toFixed(2)}%
                    </span>
                </div>
                
                <div class="info-item">
                    <strong>📊 Market Cap</strong>
                    <span>${formatearNumero(marketCap)}</span>
                </div>
                
                <div class="info-item">
                    <strong>💹 Volumen 24h</strong>
                    <span>${formatearNumero(volumen24h)}</span>
                </div>
                
                <div class="info-item">
                    <strong>🔺 Máximo 24h</strong>
                    <span style="color: var(--success);">${formatearPrecio(precioMaximo24h)}</span>
                </div>
                
                <div class="info-item">
                    <strong>🔻 Mínimo 24h</strong>
                    <span style="color: var(--error);">${formatearPrecio(precioMinimo24h)}</span>
                </div>
                
                <div class="info-item" style="grid-column: 1 / -1;">
                    <strong>🔄 Suministro Circulante</strong>
                    <span>${formatearSupply(suministroCirculante)} ${simbolo}</span>
                </div>
            </div>
            
            <div style="margin-top: 30px; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px;">
                <p style="text-align: center; opacity: 0.8; font-size: 0.9em;">
                    ⏰ Última actualización: ${new Date().toLocaleString('es-ES')}
                </p>
                <p style="text-align: center; opacity: 0.6; font-size: 0.85em; margin-top: 10px;">
                    Datos proporcionados por CoinGecko
                </p>
            </div>
            
            <div style="margin-top: 20px;">
                <button class="btn" onclick="buscarCripto()" style="width: 100%;">
                    🔄 Actualizar Cotización
                </button>
            </div>
        </div>
    `;
}

// Cargar Bitcoin por defecto al abrir la página
window.addEventListener('DOMContentLoaded', () => {
    buscarCripto();
});
