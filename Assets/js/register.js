// Obtener el botón y los campos de entrada
const regButton = document.getElementById("regButton");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Obtener los elementos donde se mostrarán los errores
const nombreError = document.getElementById("nombreError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

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

// Función de registro
function registrarUsuario(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (si es necesario)

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Ocultar los mensajes de error al inicio
    ocultarError(nombreError);
    ocultarError(emailError);
    ocultarError(passwordError);
    ocultarError(confirmPasswordError);

    // Validaciones
    let valid = true;

    if (!nombre) {
        mostrarError(nombreError, "Por favor, ingrese un nombre de usuario.");
        valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        mostrarError(emailError, "Ingrese un correo electrónico válido.");
        valid = false;
    }

    if (password.length < 6) {
        mostrarError(passwordError, "La contraseña debe tener al menos 6 caracteres.");
        valid = false;
    }

    if (password !== confirmPassword) {
        mostrarError(confirmPasswordError, "Las contraseñas no coinciden.");
        valid = false;
    }

    if (!valid) {
        return;  // Si hay errores, no continuar con el registro
    }

    // Guardar usuario en localStorage
    const usuario = {
        nombre: nombre,
        email: email,
        password: password
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Marcar como logeado
    localStorage.setItem("usuarioLogeado", email);

    // Redirigir al index
    window.location.href = "index.html";
}

// Asignar evento al botón
if (regButton) {
    regButton.addEventListener("click", registrarUsuario);
}
