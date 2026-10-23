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

    actualizarBotones(pagina, maxPaginas);
}

function montarLista(listaPersonajes) {

    const lista = document.getElementById("listaTarjetas");
    lista.innerHTML = "";

    listaPersonajes.forEach(pj => {

        // Tarjeta principal
        const divTarjeta = document.createElement("div");
        divTarjeta.classList.add("tarjeta");
        lista.appendChild(divTarjeta);

        // Imagen del personaje
        const imgPersonaje = document.createElement("img");
        imgPersonaje.classList.add("imgPersonaje");
        imgPersonaje.src = pj.image;
        imgPersonaje.alt = pj.name;
        divTarjeta.appendChild(imgPersonaje);

        // Cuerpo de la tarjeta
        const divTarjetaBody = document.createElement("div");
        divTarjetaBody.classList.add("tarjetaBody");
        divTarjeta.appendChild(divTarjetaBody);

        // Contenedor de la información
        const divInfo = document.createElement("div");
        divInfo.classList.add("info");
        divTarjetaBody.appendChild(divInfo);

        // Nombre
        const p = document.createElement("p");
        p.classList.add("nombre");
        p.textContent = pj.name;
        divInfo.appendChild(p);

        // Lista de información
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

        let favoritos = getFavoritos();

        // Icono de favoritos
        const imgFavoritos = document.createElement("img");
        if (!favoritos.find(personaje => personaje.id === pj.id)) {
            imgFavoritos.src = "../img/Corazon_vacio.png";
        } else {
            imgFavoritos.src = "../img/Corazon_lleno.png";
        }
        imgFavoritos.classList.add("favorito");
        imgFavoritos.alt = "Añadir a favoritos";

        imgFavoritos.addEventListener("click", function () {

            favoritos = getFavoritos();

            if (!favoritos.find(personaje => personaje.id === pj.id)) {

                favoritos.push(pj);

                localStorage.setItem(
                    "PersonajesFavorito",
                    JSON.stringify(favoritos)
                );

                imgFavoritos.src = "../img/Corazon_lleno.png";
            }
        });

        divTarjetaBody.appendChild(imgFavoritos);

        // Botón Ver más
        const buttonVerMas = document.createElement("button");
        buttonVerMas.classList.add("verMas");

        buttonVerMas.addEventListener("click", function () {

            localStorage.setItem("IdPersonaje", pj.id);
            location.href = "infoPersonaje.html";

        });

        // Icono del botón
        const iconVerMas = document.createElement("img");
        iconVerMas.src = "../img/Question-1.svg";
        iconVerMas.classList.add("iconVerMas");
        iconVerMas.alt = "";

        buttonVerMas.appendChild(iconVerMas);
        buttonVerMas.appendChild(document.createTextNode(" Ver más"));

        divTarjeta.appendChild(buttonVerMas);
    });

    actualizarBotones(pagina, maxPaginas);
}

function getFavoritos() {
    return JSON.parse(localStorage.getItem("PersonajesFavorito")) || [];
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

// Ejemplo: actualizar el estado de los botones
function actualizarBotones(paginaActual, totalPaginas) {
    buttonAtras.disabled = paginaActual === 1;
    buttonAdelante.disabled = paginaActual === totalPaginas;
}

await mostrarPersonajes();