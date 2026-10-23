import { getLugares } from "./main.js";

let lista;
let pagina=1;
let numpag;

const contenedor = document.getElementById("lista-lugares");

const buttonAdelante = document.getElementById("btn-delante");
buttonAdelante.addEventListener("click",PagAdelante);

const buttonAtras = document.getElementById("btn-atras");
buttonAtras.addEventListener("click",PagAtras);

async function InicioLugares() {
    lista = await getLugares();
    console.log(lista);
    numpag = lista.info.pages;
    muestraLugares(lista.lugar);
}

async function PagAdelante() {
    pagina++;
    lista = await getLugares(pagina);
    muestraLugares(lista.lugar);
}

async function PagAtras() {
    pagina--;
    lista = await getLugares(pagina);
    muestraLugares(lista.lugar);
}

function muestraLugares(listaDatos) {
    contenedor.innerHTML = listaDatos.map(lugar => `
        <div class="lugar">
            <h2>${lugar.name}</h2>
            <p>${lugar.type} · ${lugar.dimension}</p>
            <button class="button-more">Saber más</button>
            <div>
            <class="button-fav">
            <img src="../img/heart.svg">
            </div>
        </div>
    `).join("");
}


InicioLugares();