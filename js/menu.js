const botonMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

botonMenu.addEventListener("click", function () {
    const abierto = menuPrincipal.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
});