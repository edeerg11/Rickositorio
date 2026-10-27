import { getEpisodio, getElementByURL } from "./main.js";
let episodio;
const MAX_CHARS = 10;

async function buildReportEpisode() {
    let chars = 0;
    document.getElementById("h2-episode").innerText = `T${episodio.temporada}E${episodio.episodio}`;
    document.getElementById("h3-title").innerText = episodio.name;
    document.getElementById("release-date").innerHTML += episodio.estreno;
    let characterList = document.getElementById("character-list");
    for (let url of episodio.personajes) {
        /*********VARS*************** */
        let li = document.createElement("li");
        let a = document.createElement("a");
        let img = document.createElement("img");
        let figure = document.createElement("figure");
        let figcaption = document.createElement("figcaption");
        let personaje = await getElementByURL(url, "personaje");
        /* */
        img.setAttribute("alt",`Imagen de ${personaje.name}`);
        img.src = personaje.image;
        figcaption.innerText = personaje.name;
        figure.append(img);
        figure.append(figcaption);
        a.href = "./infoPersonaje.html";
        a.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.setItem("IdPersonaje", personaje.id);
            open(this.href, "_self");
        })
        a.append(figure);
        li.append(a);
        characterList.append(li);
        if(++chars === MAX_CHARS) break;
    }
}
// === MAIN ===
episodio = await getEpisodio(localStorage.getItem("idEpisodio"));
console.log("Ep: ", episodio);
buildReportEpisode();
