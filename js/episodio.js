import { getEpisodio, getElementByURL } from "./main.js";
import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";
let episodio;
const MAX_CHARS = 10;

async function buildReportEpisode() {
    let chars = 0;
    document.getElementById("h2-episode").innerText = `T${episodio.temporada}E${episodio.episodio}`;
    document.getElementById("h3-title").innerText = episodio.name;
    document.getElementById("release-date").innerHTML += episodio.estreno;
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
