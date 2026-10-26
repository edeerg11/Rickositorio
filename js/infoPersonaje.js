import { getPersonaje } from "./main.js";

const idPersonaje = localStorage.getItem("IdPersonaje");
let personaje;
async function obtenerInfoPersonaje() {
    personaje = await getPersonaje(idPersonaje);
    console.log(personaje);
    muestraDatos()

}

function muestraDatos() {
    const container = document.getElementById("container");

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    imagen.className = "character-image";
    imagen.width=700;
    container.append(imagen);

    const info = document.createElement("section");
    info.className = "character-info";
    container.append(info);


    const titulo = document.createElement("h1");
    titulo.textContent = personaje.name;
    info.append(titulo);
    


}
obtenerInfoPersonaje();