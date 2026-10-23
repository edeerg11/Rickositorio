import { getEpisodio,getElementByURL } from "./main.js";
let episodio;

async function buildReportEpisode(){
   document.getElementById("h2-episode").innerText = `T${episodio.temporada}E${episodio.episodio}`;
   document.getElementById("h3-title").innerText = episodio.name;
   document.getElementById("release-date").innerHTML += episodio.estreno;
   let characterList = document.getElementById("character-list");
   for(let url of episodio.personajes){
    let li = document.createElement("li");
    let a = document.createElement("a");
    let personaje = await getElementByURL(url,"personaje");
    a.innerText = personaje.name;
    a.href="./infoPersonaje.html";
    a.addEventListener("click",function(e){
        e.preventDefault();
        localStorage.setItem("IdPersonaje",personaje.id);
        open(this.href,"_self");
    })
    li.append(a);
    characterList.append(li);
   }
}
// === MAIN ===
episodio = await getEpisodio(localStorage.getItem("idEpisodio"));
console.log("Ep: ", episodio);
buildReportEpisode();
