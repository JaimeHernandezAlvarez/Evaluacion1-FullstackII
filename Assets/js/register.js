// Obtener el botón y los campos de entrada
const regButton = document.getElementById("regButton");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    alert(mensaje); // Puedes cambiar por mensajes en el HTML si quieres
}

// Función de registro
function registrarUsuario() {
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validaciones
    if (!nombre || !email || !password || !confirmPassword) {
        mostrarError("Por favor, complete todos los campos.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError("Ingrese un correo electrónico válido.");
        return;
    }

    if (password.length < 6) {
        mostrarError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (password !== confirmPassword) {
        mostrarError("Las contraseñas no coinciden.");
        return;
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
