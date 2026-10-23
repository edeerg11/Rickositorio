import { getEpisodio,getElementByURL } from "./main.js";
let episodio;

function buildReportEpisode(){
   document.getElementById("h2-episode").innerText = `T${episodio.temporada}E${episodio.episodio}`;
   document.getElementById("h3-title").innerText = episodio.name;
   document.getElementById("release-date").innerHTML += episodio.estreno;
   let characterList = document.getElementById("character-list");
   for(let entrada of episodio.personajes){
    let li = document.createElement("li");
    let a = document.createElement("a");
    let personaje = getElementByURL();
    a.innerText = "";
    a.href="./infoPersonaje.html";
    a.addEventListener("click",function(e){
        e.preventDefault();
        localStorage.setItem("idPersonaje",0);
        open(this.href,"_self");
    })
    li.append(a);
   }
}
// === MAIN ===
episodio = await getEpisodio(localStorage.getItem("idEpisodio"));
console.log("Ep: ", episodio);
buildReportEpisode();
