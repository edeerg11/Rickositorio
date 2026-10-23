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

        const divTarjeta = document.createElement("div");
        divTarjeta.classList.add("tarjeta");
        lista.appendChild(divTarjeta);

        const imgPersonaje = document.createElement("img");
        imgPersonaje.classList.add("imgPersonaje");
        imgPersonaje.src = pj.image;
        divTarjeta.appendChild(imgPersonaje);

        const p = document.createElement("p");
        p.textContent = `${pj.name}`;
        divTarjeta.appendChild(p);

        const divInfo = document.createElement("div");
        divInfo.classList.add("info");
        divTarjeta.appendChild(divInfo);

        const ul = document.createElement("ul");
        divInfo.appendChild(ul);

        const liEstado = document.createElement("li");
        liEstado.textContent = pj.status;
        ul.appendChild(liEstado);

        const liEspecie = document.createElement("li");
        liEspecie.textContent = pj.species;
        ul.appendChild(liEspecie);

        const liOrigen = document.createElement("li");
        liOrigen.textContent = pj.origin.name;
        ul.appendChild(liOrigen);

        const imgFavoritos = document.createElement("img");
        imgFavoritos.src = "../img/Heart.png"
        imgFavoritos.classList.add("favorito");
        imgFavoritos.onclick = function(){
            const favoritos = JSON.parse(localStorage.getItem("PersonajesFavorito")) || [];
            favoritos.push(pj);
            localStorage.setItem("PersonajesFavorito", JSON.stringify(favoritos));
        }
        divTarjeta.appendChild(imgFavoritos);

        const buttonVerMas = document.createElement("button");
        buttonVerMas.id = 'buttonVerMas';
        // buttonVerMas.textContent = `Ver más`;
        buttonVerMas.addEventListener("click", function () {
            localStorage.setItem("IdPersonaje", pj.id);
        });
        divTarjeta.appendChild(buttonVerMas);

        const linkVerMas = document.createElement("a");
        linkVerMas.href = "vistaIndividual.html";
        linkVerMas.textContent = "Ver más";
        buttonVerMas.appendChild(linkVerMas);

    });

}

async function avanzarPagina() {
    if (pagina < maxPaginas) {
        pagina += 1;
        listaPersonajes = await getPersonajes(pagina);
        montarLista(listaPersonajes.personajes);
    }
}

async function retrocederPagina() {
    if (pagina > 1) {
        pagina -= 1;
        listaPersonajes = await getPersonajes(pagina);
        montarLista(listaPersonajes.personajes);
    }
}

const buttonAdelante = document.getElementById("buttonAdelante");
buttonAdelante.addEventListener("click", avanzarPagina);

const buttonAtras = document.getElementById("buttonAtras");
buttonAtras.addEventListener("click", retrocederPagina);

await mostrarPersonajes();