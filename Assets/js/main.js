let usuarios = [];

//obtener el botón y los campos de entrada
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtPassword');

//función para registrar la información
function registrarUsuario() {
    const email = emailInput.value;
    const password = passwordInput.value;

    //revisar llenado
    if (email && password) {
        console.log(`Email: ${email}`);
        console.log(`Contraseña: ${password}`);

    } else {
        //codigo para evitar campos vacíos
        console.log("Error, no hay campos rellenos");
    }
}
loginButton.addEventListener('click', registrarUsuario);
