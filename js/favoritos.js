// Lee los identificadores de favoritos guardados en este navegador

function leerFavoritos() {
    const guardados = localStorage.getItem("ricksplorador-favoritos");

    if (guardados === null) {
        return {
            personajes: [2],
            episodios: [],
            lugares: []
        };
    }

    return JSON.parse(guardados);
}

/*
Guarda los identificadores de favoritos en este navegador.
@param {{personajes: number[], episodios: number[], lugares: number[]}} favoritos
Objeto con las tres listas de identificadores.
@returns {void}
 */

function guardarFavoritos(favoritos) {
    const texto = JSON.stringify(favoritos);
    localStorage.setItem("ricksplorador-favoritos", texto);
}

// Localizamos dónde mostraremos los personajes favoritos.
const contenedorPersonajes = document.getElementById("favoritos-personajes");

// Leemos la selección guardada.
const favoritos = leerFavoritos();

// Busca en los datos locales los personajes seleccionados como favoritos.

async function mostrarPersonajesFavoritos() {
    const respuesta = await fetch("../data.json");
    const personajes = await respuesta.json();

    const seleccionados = personajes.filter(function (personaje) {
        return favoritos.personajes.includes(personaje.id);
    });

    seleccionados.forEach(function (personaje) {
    const nombre = document.createElement("h3");
    nombre.textContent = personaje.name;
    contenedorPersonajes.appendChild(nombre);
});
}

mostrarPersonajesFavoritos();