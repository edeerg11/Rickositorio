import charactersData from "../data.json" with {type:"json"};
import { Personaje } from "../clases/personajes.js";

 export function getPersonajes() {
    if (!charactersData|| charactersData.length===0) {
        throw new Error("No hay datos")
    }
    const personajes = charactersData.map(p =>
        new Personaje(p)
    )
    
    return personajes;
 }
 