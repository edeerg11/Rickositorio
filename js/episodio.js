import { getEpisodio, getElementByURL } from "./main.js";
import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";
let episodio;
let epFav;
const MAX_CHARS = 10;

async function buildReportEpisode() {
    let chars = 0;
    epFav = JSON.parse(localStorage.getItem("episodiosFavorito")) || [];
    let imgFav = document.getElementById("img-fav");
    if (epFav.find((e) => e.id === episodio.id) !== undefined) {
        imgFav.src = "../img/Corazon_lleno.png";
    }
    else {
        imgFav.src = "../img/Heart.png";
    }
    document.getElementById("ep-numbers").innerText = `T${episodio.temporada}E${episodio.episodio}`;
    document.getElementById("ep-title").innerText = episodio.name;
    document.getElementById("release-date").innerHTML += episodio.estreno;
    imgFav.addEventListener("click", function () {
        if (epFav.find((e) => e.id === episodio.id) !== undefined) {
            imgFav.src = "../img/Heart.png";
            epFav.splice(episodio);
        }
        else {
            imgFav.src = "../img/Corazon_lleno.png";
            epFav.push(episodio);
        }
        localStorage.setItem("episodiosFavorito", JSON.stringify(epFav));
    })
    let characterList = document.getElementById("character-list");
    for (let url of episodio.personajes) {
        let personaje = await getElementByURL(url, "personaje");
        let favorito = (JSON.parse(localStorage.getItem("PersonajesFavorito")) || [])
            .find((e) => e.id === personaje.id) !== undefined;
        characterList.append(crearTarjetaPersonaje(personaje, favorito));
        if (++chars === MAX_CHARS) break;
    }
}
// === MAIN ===
episodio = await getEpisodio(localStorage.getItem("idEpisodio"));
console.log("Ep: ", episodio);
buildReportEpisode();
