import { getLugares } from "./main.js";
import { crearTarjetaLugar } from "./tarjetaLugar.js";

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
    if (pagina < numpag) {
        pagina++;
        lista = await getLugares(pagina);
        muestraLugares(lista.lugar);
    }
}

async function PagAtras() {
    if (pagina > 1) {
        pagina--;
        lista = await getLugares(pagina);
        muestraLugares(lista.lugar);
    }
}


function muestraLugares(listaDatos) {
    contenedor.innerHTML = "";

    listaDatos.forEach(function (lugar) {
        contenedor.appendChild(crearTarjetaLugar(lugar));
    });

    actualizarBotones(pagina, numpag);
    let pagActual = document.getElementById("numPagina");
    pagActual.textContent = `Página ${pagina} de ${numpag}`;
}

function actualizarBotones(paginaActual, totalPaginas) {
    buttonAtras.disabled = paginaActual === 1;
    buttonAdelante.disabled = paginaActual === totalPaginas;
}

InicioLugares();