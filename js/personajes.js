import { getPersonajes } from "./main.js";

export function mostrarPersonajes() {
    const lista = document.getElementById("listaPersonajes");
    const personajes = getPersonajes();

    personajes.forEach(pj => {
        console.log(pj);
        const div = document.createElement("div");
        const elemento = document.createElement("li");

        elemento.textContent = `${pj.name}`;

        lista.appendChild(elemento);

    });

}

mostrarPersonajes();