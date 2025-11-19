// Script de Bienvenida para la página principal

// Función para saludar al usuario
function saludar() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    
    // Validar que se hayan ingresado ambos campos
    if (nombre === '' || apellido === '') {
        alert('Por favor, ingresa tu nombre y apellido completos.');
        return;
    }
    
    // Guardar el nombre completo en localStorage
    const nombreCompleto = `${nombre} ${apellido}`;
    localStorage.setItem('nombreUsuario', nombreCompleto);
    
    // Mostrar el saludo
    mostrarSaludo(nombreCompleto);
}

// Función para mostrar el saludo
function mostrarSaludo(nombreCompleto) {
    const userGreeting = document.getElementById('userGreeting');
    const userName = document.getElementById('userName');
    
    userName.textContent = nombreCompleto;
    userGreeting.style.display = 'block';
    
    // Ocultar el formulario de entrada
    document.getElementById('nombre').disabled = true;
    document.getElementById('apellido').disabled = true;
}

// Verificar si hay un usuario guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    
    if (nombreGuardado) {
        // Pre-llenar los campos con el nombre guardado
        const [nombre, ...apellidoArray] = nombreGuardado.split(' ');
        const apellido = apellidoArray.join(' ');
        
        document.getElementById('nombre').value = nombre;
        document.getElementById('apellido').value = apellido;
        
        // Mostrar el saludo automáticamente
        mostrarSaludo(nombreGuardado);
    }
});

// Permitir presionar Enter para enviar
document.getElementById('nombre').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        saludar();
    }
});

document.getElementById('apellido').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        saludar();
    }
});
