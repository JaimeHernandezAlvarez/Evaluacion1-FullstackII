// Obtener el botón y los campos de entrada
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtPassword');

// Obtener los elementos donde se mostrarán los errores
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Función para mostrar los mensajes de error
function mostrarError(campoError, mensaje) {
    campoError.textContent = mensaje;  // Asignar el mensaje al campo de error
    campoError.style.display = "block";  // Mostrar el mensaje
}

// Función para ocultar los mensajes de error
function ocultarError(campoError) {
    campoError.textContent = '';  // Limpiar el mensaje
    campoError.style.display = "none";  // Ocultar el mensaje
}

// Función para el login
function iniciarSesion(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Ocultar los mensajes de error al inicio
    ocultarError(emailError);
    ocultarError(passwordError);

    let valid = true;

    // Validación del email
    if (!email) {
        mostrarError(emailError, "Por favor, ingrese su email.");
        valid = false;
    }

    // Validación de la contraseña
    if (!password) {
        mostrarError(passwordError, "Por favor, ingrese su contraseña.");
        valid = false;
    }

    if (!valid) {
        return;  // Si hay errores, no continuar con el login
    }

    // Verificar si el usuario existe en el localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        // Si el usuario existe, marcar como logeado y redirigir
        localStorage.setItem("usuarioLogeado", email);
        window.location.href = "index.html";
    } else {
        // Si no existe, mostrar un mensaje de error
        mostrarError(emailError, "Email o contraseña incorrectos.");
    }
}

// Asignar evento al botón
if (loginButton) {
    loginButton.addEventListener('click', iniciarSesion);
}
