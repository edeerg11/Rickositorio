import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";
import { crearTarjetaEpisodioFav } from "./tarjetaEpisodio.js";
import { crearTarjetaLugar } from "./tarjetaLugar.js";

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

function leerLugaresFavoritos() {
    const guardados = localStorage.getItem("LugaresFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

// Comprobación temporal de la lectura.
const personajesFavoritos = leerPersonajesFavoritos();
const episodiosFavoritos = leerEpisodiosFavoritos();
const lugaresFavoritos = leerLugaresFavoritos();
console.log(episodiosFavoritos);


const contenedorPersonajes = document.getElementById("favoritos-personajes");
const contenedorEpisodios = document.getElementById("favoritos-episodios");
const contenedorLugares = document.getElementById("favoritos-lugares");


// Creo una tarjeta por cada personaje guardado y la añado a la página.
personajesFavoritos.forEach(function (personaje) {
    const tarjeta = crearTarjetaPersonaje(personaje, true);
    contenedorPersonajes.appendChild(tarjeta);
});

// Creo una tarjeta por cada lugar guardado y la añado a la página.
lugaresFavoritos.forEach(function (lugar) {
    const tarjeta = crearTarjetaLugar(lugar, true);
    contenedorLugares.appendChild(tarjeta);
});

//Crear tarjetas para los episodios favoritos.
episodiosFavoritos.forEach(function (episodio) {

    const tarjeta = crearTarjetaEpisodioFav(episodio, true);

    contenedorEpisodios.appendChild(tarjeta);

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