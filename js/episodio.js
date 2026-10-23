import { getEpisodio } from "./main.js";
let episodio;

function buildReportEpisode(){
   // document.getElementById("h2-episode").innerText = epis
}
// === MAIN ===
episodio = await getEpisodio(localStorage.getItem("idEpisodio"));
console.log("Ep: ", episodio);
buildReportEpisode();
