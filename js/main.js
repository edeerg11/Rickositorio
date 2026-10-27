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

export async function getPersonajesFiltrados(numPage, filtro) {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const url = new URL(API_URL);

    url.searchParams.set("page", numPage);

    // Aplicar los filtros seleccionados
    if (filtro.nombre) {
        url.searchParams.set("name", filtro.nombre);
    }

    if (filtro.estado) {
        url.searchParams.set("status", filtro.estado);
    }

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


export async function getEpisodios(numberPage = 1) {
    const API_URL = "https://rickandmortyapi.com/api/episode";

    const url = numberPage === 1 ?
        API_URL
        : `${API_URL}?page=${numberPage}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener los datos del episodio');
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay datos")
    }
    const episodios = data.results.map(p =>
        new Episodio(p)
    )

    return {
        episodios,
        info: data.info
    };
}

export async function getLugares(numberPage = 1) {
    const API_URL = "https://rickandmortyapi.com/api/location";

    const url = numberPage === 1 ?
        API_URL
        : `${API_URL}?page=${numberPage}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener los datos del lugar');
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay datos")
    }
    const lugar = data.results.map(p =>
        new Lugar(p)
    )

    return {
        lugar,
        info: data.info
    };
}

/**
 * 
 * @param {number} id id del personaje
 * @returns info del personaje individual 
 */
export async function getPersonaje(id) {
    const API_URL = `https://rickandmortyapi.com/api/character/${id}`;
    console.log(API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del personaje');
    }
    const data = await response.json();
    const personaje = new Personaje(data);
    return personaje;
}



/**
 * 
 * @param {number} id id del lugar
 * @returns info del lugar individual 
 */
export async function getLugar(id) {
    const API_URL = `https://rickandmortyapi.com/api/location/${id}`;
    console.log(API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del lugar');
    }
    const data = await response.json();
    const episodio = new Episodio(data);
    return episodio;
}


/**
 * 
 * @param {number} id id del episodio
 * @returns info del episodio individual 
 */
export async function getEpisodio(id) {
    const API_URL = `https://rickandmortyapi.com/api/episode/${id}`;
    console.log(API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del episodio');
    }
    const data = await response.json();
    const episodio = new Episodio(data);
    return episodio;
}
export async function getElementByURL(url, type = "personaje" || "lugar" || "episodio") {
    const API_URL = url;
    console.log(API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del personaje');
    }
    const data = await response.json();
    let element;
    switch (type) {
        case "personaje":
            element = new Personaje(data);
            break;
        case "lugar":
            element = new Lugar(data);
            break;
        case "episodio":
            element = new Episodio(data);
            break;
    }

    return element;
}

