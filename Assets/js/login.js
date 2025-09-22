//obtener el botón y los campos de entrada
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtPassword');

function registrarUsuario() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
        localStorage.setItem("usuarioLogeado", email);
        window.location.href = "index.html";
    } else {
        console.log("Error, no hay campos rellenos");
    }
}

//boton :)
if (loginButton) {
    loginButton.addEventListener('click', registrarUsuario);
}
