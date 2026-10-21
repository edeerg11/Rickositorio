import charactersData from "../data.json" with {type: "json"};
import { Personaje } from "../clases/Personaje.js";
import { Lugar } from "../clases/Lugar.js";
import { Episodio } from "../clases/Episodio.js";

export function getPersonajes() {
    if (!charactersData || charactersData.length === 0) {
        throw new Error("No hay datos")
    }
    const personajes = charactersData.map(p =>
        new Personaje(p)
    )

    return personajes;
}


export function getPersonaje(url) {
   try {
    console.log(url);
    
   } catch (error) {
    
   }
}

export function getLugares() {
    const lugaresData = [];
    if (!lugaresData|| lugaresData.length===0) {
        throw new Error("No hay datos")
    }
    const lugares = lugaresData.map(lugar =>
        new Lugar(lugar)
    );
    return lugares;
 }
 
 export function getEpisodios() {
    const episodiosData = [];
    if (!episodiosData|| episodiosData.length===0) {
        throw new Error("No hay datos")
    }
    const episodios = episodiosData.map(episodio =>
        new Episodio(episodio)
    );
    return episodios;
 }
