import { getPersonaje } from "./main.js";

const idPersonaje = localStorage.getItem("IdPersonaje");
let personaje;
async function obtenerInfoPersonaje() {
    personaje = await getPersonaje(idPersonaje);
    console.log(personaje);
    muestraDatos()

}

function muestraDatos() {
    console.log(personaje);

    const container = document.getElementById("container");

    // Crear imagen
    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    imagen.width = 550;
    imagen.className = "character-image";

    // Crear sección de información
    const info = document.createElement("section");
    info.className = "character-info";

    const titulo = document.createElement("h1");
    titulo.textContent = personaje.name;

    const caps = document.createElement("p");
    caps.className = "character-caps";
    caps.textContent = `Ha participado en ${personaje.episode.length} episodios`;

    // Crear sección de datos
    const datos = document.createElement("section");
    datos.className = "character-datos";

    const estado = document.createElement("p");
    estado.className = "character-status";

    const icono = document.createElement("img");
    icono.src = "../img/Pulse.png";
    icono.alt = "";
    icono.className = "status-icon";

    const texto = document.createElement("span");
    texto.textContent = personaje.status;

    estado.append(icono, texto);

    const especie = document.createElement("p");
    especie.className = "character-specie";
    especie.textContent = personaje.species;

    const genero = document.createElement("p");
    genero.className = "character-gender";
    genero.textContent = personaje.gender;

    // Organizar estructura
    datos.append(estado, especie, genero);
    info.append(titulo, caps, datos);
    container.append(imagen, info);


}
obtenerInfoPersonaje();