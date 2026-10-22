import charactersData from "../data.json" with {type: "json"};
import EpisodesData from "../dataEpisodes.json" with {type: "json"};
import { Personaje } from "../clases/Personaje.js";
import { Lugar } from "../clases/Lugar.js";
import { Episodio } from "../clases/Episodio.js";

export async function getPersonajes(numberPage = 1) {
    const API_URL = "https://rickandmortyapi.com/api/character";

    const url = numberPage === 1 ?
        API_URL
        : `${API_URL}/?page=${numberPage}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener los datos del personaje');
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay datos")
    }
    const personajes = data.results.map(p =>
        new Personaje(p)
    )

    return {
        personajes,
        info: data.info
    };
}

/**
 * 
 * @param {number} id id del personaje
 * @returns info del personaje individual 
 */
export function getPersonaje(id) {
    try {
        //const response = await fetch(url);
        const response = [];
        if (!response.ok) {
            throw new Error("Error al obtener el personaje");
        }
        const datos = response.json();

        return new Personaje(datos);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function getLugares() {
    const lugaresData = [];
    if (!lugaresData || lugaresData.length === 0) {
        throw new Error("No hay datos")
    }
    const lugares = lugaresData.map(lugar =>
        new Lugar(lugar)
    );
    return lugares;
}

/**
 * 
 * @param {number} id id del lugar
 * @returns info del lugar individual 
 */
export function getLugar(id) {
    try {
        //const response = await fetch(url);
        const response = [];
        if (!response.ok) {
            throw new Error("Error al obtener el lugar");
        }
        const datos = response.json();

        return new Lugar(datos);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function getEpisodios() {
    const episodiosData = EpisodesData;
    if (!episodiosData || episodiosData.length === 0) {
        throw new Error("No hay datos")
    }
    const episodios = episodiosData.map(episodio =>
        new Episodio(episodio)
    );
    return episodios;
}

/**
 * 
 * @param {number} id id del episodio
 * @returns info del episodio individual 
 */
export function getEpisodio(id) {
    try {
        //const response = await fetch(url);
        const response = [];
        if (!response.ok) {
            throw new Error("Error al obtener el episodio");
        }
        const datos = response.json();

        return new Episodio(datos);
    } catch (error) {
        console.error(error);
        throw error;
    }
}