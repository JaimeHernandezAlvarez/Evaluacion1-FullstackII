const loginLink = document.getElementById('loginLink');
const loginStatus = document.getElementById('loginStatus');

//revisar si hay usuario logeado
document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuarioLogeado");
    if (usuario && loginLink && loginStatus) {
        loginLink.textContent = "Mi Perfil";
        loginLink.href = "#perfil";

        loginStatus.textContent = "Cerrar sesión";
        loginStatus.style.cursor = "pointer";

        loginStatus.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogeado");
            loginLink.textContent = "Log-In";
            loginLink.href = "login.html";
            loginStatus.textContent = "Iniciar Sesión";
        });
    }
});
