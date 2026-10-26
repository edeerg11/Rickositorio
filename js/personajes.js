import { getPersonajes, getPersonajesFiltrados } from "./main.js";
import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";

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

        const tarjeta = crearTarjetaPersonaje(pj);

        lista.appendChild(tarjeta);

    });

    // maxPaginas = listaPersonajes.info.pages;

    actualizarBotones(pagina, maxPaginas);
    let pagActual = document.getElementById("numPagina");
    pagActual.textContent = `Página ${pagina} de ${maxPaginas}`;

}

const formulario = document.getElementById("formularioFiltros");
let filtro = {
        nombre,
        estado
    }

formulario.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener los valores del formulario
    const name = document.getElementById("nombre").value
        .trim()
        .toLowerCase();

    const estado = document.getElementById("estado").value
        .toLowerCase();

    filtro = {
        nombre: name,
        estado: estado
    }

    // Filtrar los personajes
    const personajesFiltrados = await getPersonajesFiltrados(pagina, filtro);

    console.log(personajesFiltrados);

    // Mostrar solamente los personajes que coinciden
    montarLista(personajesFiltrados.personajes);
});

async function avanzarPagina() {
    if (pagina < maxPaginas) {
        pagina += 1;
        listaPersonajes = await getPersonajesFiltrados(pagina, filtro);
        montarLista(listaPersonajes.personajes);
    }
}

async function retrocederPagina() {
    if (pagina > 1) {
        pagina -= 1;
        listaPersonajes = await getPersonajesFiltrados(pagina, filtro);
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