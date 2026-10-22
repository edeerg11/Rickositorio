import { getPersonajes } from "./main.js";

let pagina = 1;
let listaPersonajes = [];
let maxPaginas;

async function mostrarPersonajes(number) {
    listaPersonajes = await getPersonajes(number);
    
    console.log(listaPersonajes);

    maxPaginas = listaPersonajes.info.pages;
    console.log(maxPaginas);
    

    montarLista(listaPersonajes.personajes);
}

function montarLista(listaPersonajes) {

    const lista = document.getElementById("listaTarjetas");

    lista.innerHTML = "";

    listaPersonajes.forEach(pj => {

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

async function alertAdelante() {
    if(pagina < maxPaginas){
        pagina += 1;
        listaPersonajes = await getPersonajes(pagina);
        montarLista(listaPersonajes.personajes);
    }
}

async function alertAtras() {
    if(pagina > 1){
        pagina -= 1;
        listaPersonajes = await getPersonajes(pagina);
        montarLista(listaPersonajes.personajes);
    }
}

const buttonAdelante = document.getElementById("buttonAdelante");
buttonAdelante.addEventListener("click", alertAdelante);

const buttonAtras = document.getElementById("buttonAtras");
buttonAtras.addEventListener("click", alertAtras);

await mostrarPersonajes();