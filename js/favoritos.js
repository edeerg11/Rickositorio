import { crearTarjetaPersonajeFav } from "./tarjetaPersonajeFav.js";

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
    const tarjeta = crearTarjetaPersonajeFav(personaje);
    contenedorPersonajes.appendChild(tarjeta);
});