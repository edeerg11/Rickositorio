import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";

/*
 Recupera los personajes guardados como favoritos.
 */

function leerPersonajesFavoritos() {
    const guardados = localStorage.getItem("PersonajesFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

function leerEpisodiosFavoritos() {
    const guardados = localStorage.getItem("episodiosFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

// Comprobación temporal de la lectura.
const personajesFavoritos = leerPersonajesFavoritos();
const epispdiosFavoritos = leerEpisodiosFavoritos();
console.log(epispdiosFavoritos);


const contenedorPersonajes = document.getElementById("favoritos-personajes");

// Creo una tarjeta por cada personaje guardado y la añado a la página.
personajesFavoritos.forEach(function (personaje) {
    const tarjeta = crearTarjetaPersonaje(personaje, true);
    contenedorPersonajes.appendChild(tarjeta);
});

// Comprueba si una sección tiene tarjetas
function actualizarSeccion(idContenedor, idTitulo, idMensaje) {

    const contenedor = document.getElementById(idContenedor);
    const titulo = document.getElementById(idTitulo);
    const mensaje = document.getElementById(idMensaje);

    // Compruebo si el contenedor está vacío
    const estaVacio = contenedor.children.length === 0;

    // Si está vacío, oculto el título
    titulo.hidden = estaVacio;

    // Si está vacío, muestro el mensaje
    mensaje.hidden = !estaVacio;
}


// Actualizo las tres secciones
function actualizarSecciones() {

    actualizarSeccion(
        "favoritos-personajes",
        "titulo-personajes",
        "sin-personajes"
    );

    actualizarSeccion(
        "favoritos-episodios",
        "titulo-episodios",
        "sin-episodios"
    );

    actualizarSeccion(
        "favoritos-lugares",
        "titulo-lugares",
        "sin-lugares"
    );
}


// Compruebo las secciones al cargar la página
actualizarSecciones();


// Actualizo los mensajes cuando se pulsa una tarjeta
const contenedores = [
    "favoritos-personajes",
    "favoritos-episodios",
    "favoritos-lugares"
];

contenedores.forEach(function (id) {

    const contenedor = document.getElementById(id);

    contenedor.addEventListener("click", actualizarSecciones);

});