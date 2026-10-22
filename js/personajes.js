import { getPersonajes } from "./main.js";

export function mostrarPersonajes() {
    const lista = document.getElementById("listaTarjetas");
    const personajes = getPersonajes();

    personajes.forEach(pj => {
        console.log(pj);

        const div = document.createElement("div");
        div.classList.add("tarjeta");
        lista.appendChild(div);

        const img = document.createElement("img");
        img.src = pj.image;
        div.appendChild(img);

        const p = document.createElement("p");
        p.textContent = `${pj.name}`;
        div.appendChild(p);

        const ul = document.createElement("ul");
        div.appendChild(ul);

        const liEstado = document.createElement("li");
        liEstado.textContent = pj.status;
        ul.appendChild(liEstado);

        const liEspecie = document.createElement("li");
        liEspecie.textContent = pj.species;
        ul.appendChild(liEspecie);

        const liOrigen = document.createElement("li");
        liOrigen.textContent = pj.origin.name;
        ul.appendChild(liOrigen);

        const buttonFavoritos = document.createElement("button");
        buttonFavoritos.textContent = `Favorito`;
        div.appendChild(buttonFavoritos);
        
        const buttonVerMas = document.createElement("button");
        buttonVerMas.textContent = `Ver más`;
        div.appendChild(buttonVerMas);

    });

}

function alertAdelante(){
    alert("Has pulsado el boton hacia adelante");
}

function alertAtras(){
    alert("Has pulsado el boton hacia atras");
}

const buttonAdelante = document.getElementById("buttonAdelante");
buttonAdelante.addEventListener("click", alertAdelante);

const buttonAtras = document.getElementById("buttonAtras");
buttonAtras.addEventListener("click", alertAtras);

mostrarPersonajes();