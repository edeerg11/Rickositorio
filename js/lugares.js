import { getLugares } from "./main.js";

let lista;
let pagina = 1;
let numpag;


const contenedor = document.getElementById("listaTarjetas");

const buttonAdelante = document.getElementById("buttonAdelante");
buttonAdelante.addEventListener("click", PagAdelante);

const buttonAtras = document.getElementById("buttonAtras");
buttonAtras.addEventListener("click", PagAtras);


async function InicioLugares() {
    lista = await getLugares();
    console.log(lista);
    numpag = lista.info.pages;
    muestraLugares(lista.lugar);
}

async function PagAdelante() {
    if(pagina < numpag){
    pagina++;
    lista = await getLugares(pagina);
    muestraLugares(lista.lugar);
    }
}

async function PagAtras() {
    if(pagina > 1){
    pagina--;
    lista = await getLugares(pagina);
    muestraLugares(lista.lugar);
    }
}


function muestraLugares(listaDatos) {
    const favoritos = getFavoritosLugares();
    contenedor.innerHTML = listaDatos.map(lugar => `
<div class="tarjeta">
    <div class="tarjetaBody">
        <div class="info">
            <p class="nombre">${lugar.name}</p>
            <ul>
                <li>${lugar.type}</li>
                <li>${lugar.dimension}</li>
            </ul>
        </div>
        <img class="favorito" data-id="${lugar.id}" src="${favoritos.find(f =>
        f.id === lugar.id) !== undefined ? "../img/Corazon_lleno.png" : "../img/Corazon_vacio.png"}" alt="Añadir a favoritos">
    </div>
    <div class="btn-sabermas">
        <a href="singlelocalizacion.html?id=${lugar.id}">Saber más</a>
    </div>
</div>
    `).join("");
    actualizarBotones(pagina, numpag);
    let pagActual = document.getElementById("numPagina");
    pagActual.textContent = `Página ${pagina} de ${numpag}`;
}

contenedor.addEventListener("click", function (e) {
    if (!e.target.classList.contains("favorito")) return;

    const corazon = e.target;
    const id = Number(corazon.dataset.id);
    const lugar = lista.lugar.find(l => l.id === id);
    const favoritos = getFavoritosLugares();

    if (favoritos.find(f => f.id === id) === undefined) {
        favoritos.push(lugar);
        localStorage.setItem("LugaresFavorito", JSON.stringify(favoritos));
        corazon.src = "../img/Corazon_lleno.png";
    }
});


function getFavoritosLugares() {
    return JSON.parse(localStorage.getItem("LugaresFavorito")) || [];
}

function actualizarBotones(paginaActual, totalPaginas) {
    buttonAtras.disabled = paginaActual === 1;
    buttonAdelante.disabled = paginaActual === totalPaginas;
}


InicioLugares();