# 🌐 Proyecto de APIs Interactivas - TP4

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva que consume 5 APIs diferentes para mostrar información en tiempo real sobre:

- ☁️ **Clima** - OpenWeather API
- 🌍 **Países** - REST Countries API
- ⚡ **Pokémon** - PokéAPI
- 🛸 **Rick & Morty** - Rick & Morty API
- 💰 **Criptomonedas** - CoinGecko API

## 📁 Estructura del Proyecto

```
proyecto_apis/
├── templates/
│   ├── index.html          # Página principal con bienvenida
│   ├── clima.html          # Consulta del clima
│   ├── paises.html         # Información de países
│   ├── pokemon.html        # PokéDex virtual
│   ├── rick.html           # Personajes de Rick & Morty
│   └── cripto.html         # Cotización de criptomonedas
├── statics/
│   ├── css/
│   │   └── styles.css      # Estilos generales con animaciones
│   └── images/             # Carpeta para imágenes
├── js/
│   ├── script_bienvenida.js    # Lógica de bienvenida
│   ├── clima.js               # Lógica API del clima
│   ├── paises.js              # Lógica API de países
│   ├── pokemon.js             # Lógica API de Pokémon
│   ├── rick.js                # Lógica API Rick & Morty
│   └── cripto.js              # Lógica API de criptomonedas
└── Index.html              # Redirección a página principal
```

## 🚀 Características

### Página Principal (index.html)
- ✅ Formulario de bienvenida con nombre y apellido
- ✅ Almacenamiento local del nombre del usuario
- ✅ 5 botones para navegar a cada API
- ✅ Diseño moderno con gradientes y animaciones
- ✅ Totalmente responsive

### API del Clima (clima.html)
- 🌡️ Temperatura actual
- 💧 Humedad
- ☁️ Descripción del clima
- 💨 Velocidad del viento
- 📊 Presión atmosférica
- 🤚 Sensación térmica

### API de Países (paises.html)
- 🏛️ Nombre y capital
- 👥 Población
- 🏳️ Bandera
- 🌎 Continente y región
- 💬 Idiomas
- 💰 Moneda

### API de Pokémon (pokemon.html)
- 🖼️ Imagen oficial
- 📛 Nombre y número
- 🎨 Tipo(s) con colores
- ⚖️ Peso y altura
- ✨ Habilidades
- 📊 Estadísticas base con barras

### API de Rick & Morty (rick.html)
- 🖼️ Imagen del personaje
- 👤 Nombre
- 💓 Estado (vivo/muerto/desconocido)
- 🧬 Especie y género
- 🌍 Origen
- 📍 Última ubicación
- 🎲 Función de personaje aleatorio

### API de Criptomonedas (cripto.html)
- 💵 Precio en USD
- 📈/📉 Cambio en 24h
- 📊 Market Cap
- 💹 Volumen de 24h
- 🔺 Precio máximo 24h
- 🔻 Precio mínimo 24h
- 🔄 Suministro circulante
- ⚡ Actualización automática

## 🎨 Características de Diseño

- **Tema oscuro moderno** con gradientes morados y azules
- **Animaciones suaves** (fadeIn, slideIn, pulse, float, glow)
- **Diseño responsive** que se adapta a móviles y tablets
- **Efectos hover** en botones y tarjetas
- **Loading states** mientras se cargan los datos
- **Mensajes de error** personalizados
- **Scrollbar personalizada**
- **Badges y tags** con colores según contexto

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados con gradientes y animaciones
- **JavaScript ES6+** - Fetch API, Async/Await, LocalStorage
- **APIs REST** - Consumo de APIs públicas

## 📖 Cómo Usar

1. **Abrir el proyecto**: Abre `Index.html` en tu navegador
2. **Página de bienvenida**: Ingresa tu nombre y apellido
3. **Explorar APIs**: Haz clic en cualquiera de los 5 botones
4. **Buscar información**: Usa los campos de búsqueda en cada página
5. **Volver al inicio**: Usa el botón "🏠 Inicio" en cada página

## 🔑 APIs Utilizadas

1. **OpenWeather API** - https://openweathermap.org/api
2. **REST Countries** - https://restcountries.com
3. **PokéAPI** - https://pokeapi.co
4. **Rick & Morty API** - https://rickandmortyapi.com
5. **CoinGecko API** - https://www.coingecko.com/api

## 💡 Funcionalidades Especiales

- **LocalStorage**: Guarda el nombre del usuario entre sesiones
- **Enter key**: Permite buscar presionando Enter
- **Formateo de números**: Usa Intl.NumberFormat para formato local
- **Manejo de errores**: Validaciones y mensajes claros
- **Estados visuales**: Colores diferentes según el contexto (vivo/muerto, ganancia/pérdida, etc.)

## 📱 Responsive Design

El proyecto está completamente optimizado para:
- 📱 Móviles (320px - 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (1024px+)

## 🎯 Cumplimiento de Requisitos

✅ Estructura de carpetas completa  
✅ 6 páginas HTML (index + 5 APIs)  
✅ 6 archivos JavaScript  
✅ CSS con estilos y animaciones  
✅ Página principal con bienvenida personalizada  
✅ Todas las APIs funcionando correctamente  
✅ Botones de navegación en todas las páginas  
✅ Diseño atractivo y profesional  

## 👨‍💻 Autor

Proyecto desarrollado para TP4 - Noviembre 2025

---

**¡Disfruta explorando las APIs! 🚀**
