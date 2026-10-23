import { getEpisodios } from "./main.js";
let listaEpisodios;
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

////////////////////////////////////////////////
function buildGridEpisodes() {
    let tarjetas = listaEpisodios.episodios;
    let gridEpisodes = document.getElementById("grid-episodes");
    for (let i = 0; i<tarjetas.length; i++) {
        gridEpisodes.append(buildCardEpisode(tarjetas[i]));
    }
}

function cleanGridEpisodes(){
    let cardEpisodes = document.querySelectorAll(".card-episode");
    cardEpisodes.forEach(element => {
        element.remove();
    });
}

function buildCardEpisode(data) {
    //Crea tarjeta.
    let card = document.createElement("div");
    card.classList.add("card-episode");
    //Crea e inserta datos de episodio
    let elem = document.createElement("div");
    elem.classList.add("data-episode");
    elem.innerText= `${data.name} | T${data.temporada}E${data.episodio}`;
    card.append(elem);
    //crea e inserta controles del episodio
    card.append(buildControlsEpisode(data));
    return card;
}
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
    link.addEventListener("click",function(e){
        e.preventDefault();
        localStorage.setItem("idEpisodio",data.id);
        open(this.href,"_self");
    });
    elem.append(link);
    //Inserta botón de saber más
    consEp.append(elem);
    //crea e inserta botón de favoritos
    elem = document.createElement("div");
    elem.classList.add("button-fav");
    link = document.createElement("a");
    let img = document.createElement("img");
    img.setAttribute("alt","Favorito");
    img.src = "../img/Heart.svg";
    link.append(img);
    elem.append(link);
    link.addEventListener("click",function(e){
        e.preventDefault();
        let listaFavoritos = JSON.parse(localStorage.getItem("episodiosFavorito"))|| [];
        if(listaFavoritos.find((e)=>e.id===data.id)=== undefined){
            listaFavoritos.push(data);
        }
        localStorage.setItem("episodiosFavorito",JSON.stringify(listaFavoritos));
    })
    consEp.append(elem);
    return consEp;
}

function updateButtons() {
     if(pagina === 1){
        document.getElementById("b_atras").disabled = true;
    }else{
        document.getElementById("b_atras").disabled = false;
    }
    if(pagina === listaEpisodios.info.pages){
        document.getElementById("b_adelante").disabled = true;
    } else{
        document.getElementById("b_adelante").disabled = false;
    }
}

//===== MAIN FUNCTIONS
await obtenerEpisodios();
buildGridEpisodes();
