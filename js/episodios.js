import { getEpisodios } from "./main.js";
let listaEpisodios;
let listaFavoritos;
let pagina = 1;

const buttonAdelante = document.getElementById("b_adelante");
buttonAdelante.addEventListener("click", avanzarPag);

const buttonAtras = document.getElementById("b_atras");
buttonAtras.addEventListener("click", retrocederPag);

async function obtenerEpisodios() {
    listaEpisodios = await getEpisodios();
    updateButtons();
    console.log(listaEpisodios);
}

async function avanzarPag() {
    cleanGridEpisodes();
    pagina += 1;
    listaEpisodios = await getEpisodios(pagina);
    updateButtons();
    buildGridEpisodes();
    console.log(pagina);
}
async function retrocederPag() {
    cleanGridEpisodes();
    pagina -= 1;
    listaEpisodios = await getEpisodios(pagina);
    updateButtons();
    buildGridEpisodes();
    console.log(pagina);
}

function obtenerFavoritos() {
    listaFavoritos = JSON.parse(localStorage.getItem("episodiosFavorito")) || [];
}

////////////////////////////////////////////////
// === Carga el grid de episodios ===
function buildGridEpisodes() {
    let tarjetas = listaEpisodios.episodios;
    let gridEpisodes = document.getElementById("grid-episodes");
    for (let i = 0; i < tarjetas.length; i++) {
        gridEpisodes.append(buildCardEpisode(tarjetas[i]));
    }
}
// === Vacía el Grid de episodios ===
function cleanGridEpisodes() {
    let cardEpisodes = document.querySelectorAll(".card-episode");
    cardEpisodes.forEach(element => {
        element.remove();
    });
}

// === Genera la ficha de cada episodio ===
function buildCardEpisode(data) {
    //Crea tarjeta.
    let card = document.createElement("div");
    card.classList.add("card-episode");
    //Crea e inserta datos de episodio
    let elem = document.createElement("div");
    elem.classList.add("data-episode");
    elem.innerText = `${data.name} | T${data.temporada}E${data.episodio}`;
    card.append(elem);
    //crea e inserta controles del episodio
    card.append(buildControlsEpisode(data));
    return card;
}

// === Genera los controles de la ficha de episodios ===
function buildControlsEpisode(data) {
    //Crea contenedor
    let consEp = document.createElement("div");
    consEp.classList.add("controls-episode");
    //Crea botón de saber más
    let elem = document.createElement("div");
    elem.classList.add("button-more");
    //Crea enlace de saber más e inserta en el botón
    let link = document.createElement("a");
    link.href = "./episodio.html";
    link.innerText = "Saber más";
    link.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.setItem("idEpisodio", data.id);
        open(this.href, "_self");
    });
    elem.append(link);
    //Inserta botón de saber más
    consEp.append(elem);
    //Crea e inserta botón de favoritos
    elem = document.createElement("div");
    elem.classList.add("button-fav");
    link = document.createElement("a");
    let img = document.createElement("img");
    img.setAttribute("alt", "Favorito");
    //Configura si está activado según la lista de favoritos
    if (listaFavoritos.find((e) => e.id === data.id) === undefined) {
        img.src="../img/Heart.png";
    } else {
        img.src="../img/Corazon_lleno.png";
    }
    link.append(img);
    elem.append(link);
    //Configura evento del enlace.
    link.addEventListener("click", function (e) {
        e.preventDefault();
        listaFavoritos = JSON.parse(localStorage.getItem("episodiosFavorito")) || [];
        if (listaFavoritos.find((e) => e.id === data.id) === undefined) {
            listaFavoritos.push(data);
            img.src="../img/Corazon_lleno.png";
        } else {
            listaFavoritos.splice(data);
            img.src="../img/Heart.png";
        }
        localStorage.setItem("episodiosFavorito", JSON.stringify(listaFavoritos));
    })
    consEp.append(elem);
    return consEp;
}

// Actualiza los botones de paginación ===
function updateButtons() {
    if (pagina === 1) {
        document.getElementById("b_atras").disabled = true;
    } else {
        document.getElementById("b_atras").disabled = false;
    }
    if (pagina === listaEpisodios.info.pages) {
        document.getElementById("b_adelante").disabled = true;
    } else {
        document.getElementById("b_adelante").disabled = false;
    }
}

//===== MAIN FUNCTIONS
//Obtiene los episodios de la API
await obtenerEpisodios();
//Obtiene los favoritos del LocalStore
obtenerFavoritos();
//Construye la página
buildGridEpisodes();
