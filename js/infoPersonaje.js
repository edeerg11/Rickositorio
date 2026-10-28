import { getPersonaje, getElementByURL } from "./main.js";
import { crearTarjetaEpisodioFav } from "./tarjetaEpisodio.js";
import { crearTarjetaLugar } from "./tarjetaLugar.js";


const idPersonaje = localStorage.getItem("IdPersonaje");
let personaje;

async function obtenerInfoPersonaje() {
    personaje = await getPersonaje(idPersonaje);
    console.log(personaje);

    await muestraDatos();
}

async function muestraDatos() {
    const container = document.getElementById("container");

    // Limpiar el contenedor
    container.innerHTML = "";

    // =========================
    // CONTENEDOR SUPERIOR
    // =========================

    const parteSuperior = document.createElement("div");
    parteSuperior.className = "character-top";

    // Crear imagen
    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;
    imagen.className = "character-image";

    // Crear sección de información
    const info = document.createElement("section");
    info.className = "character-info";

    const titulo = document.createElement("h1");
    titulo.textContent = personaje.name;

    const caps = document.createElement("p");
    caps.className = "character-caps";
    caps.textContent =
        `Ha participado en ${personaje.episode.length} episodios`;

    // =========================
    // DATOS DEL PERSONAJE
    // =========================

    const datos = document.createElement("section");
    datos.className = "character-datos";

    // Estado
    const estado = document.createElement("p");
    estado.className = "character-status";

    const icono = document.createElement("img");
    icono.src = "../img/Pulse.png";
    icono.alt = "";
    icono.className = "status-icon";

    const texto = document.createElement("span");
    texto.textContent = personaje.status;

    estado.append(icono, texto);

    // Especie
    const especie = document.createElement("p");
    especie.className = "character-status";

    const iconoEspecie = document.createElement("img");
    iconoEspecie.src = "../img/Alien.png";
    iconoEspecie.alt = "";
    iconoEspecie.className = "status-icon";

    const textoEspecie = document.createElement("span");
    textoEspecie.textContent = personaje.species;

    especie.append(iconoEspecie, textoEspecie);
    const genero = document.createElement("p");
    genero.className = "character-status";

    const iconoGenero = document.createElement("img");
    iconoGenero.src = (personaje.gender == "Male") ? "../img/GenderMale.svg" : "../img/GenderFemale.svg";
    iconoGenero.alt = "";
    iconoGenero.className = "status-icon";

    const textoGenero = document.createElement("span");
    textoGenero.textContent = personaje.gender;

    genero.append(iconoGenero, textoGenero);
    // Añadir los datos
    datos.append(estado, especie, genero);


    // Localización
    const localizacion = document.createElement("div");
    localizacion.className = "character-localizacion";

    const iconoLocalizacion = document.createElement("img");
    iconoLocalizacion.src = "../img/Alien.png";
    iconoLocalizacion.alt = "";
    iconoLocalizacion.className = "status-icon";

    const textoLocalizacion = document.createElement("span");
    textoLocalizacion.textContent = personaje.location.name;
    const localizacionInfo = await getElementByURL(personaje.location.url, "lugar");

    console.log(localizacionInfo);
    const tarjeta =  crearTarjetaLugar(localizacionInfo);
    if (tarjeta) {
        localizacion.append(tarjeta);
    }
   
    

    // Añadir información a la sección
    info.append(titulo, caps, datos, localizacion);
    // Imagen e información arriba
    parteSuperior.append(imagen, info);

    // =========================
    // CONTENEDOR DE EPISODIOS
    // =========================

    const episodiosContainer = document.createElement("section");
    episodiosContainer.className = "episodios-container";

    const tituloEpisodios = document.createElement("h2");
    tituloEpisodios.textContent = "Episodios";
    tituloEpisodios.className = "episodios-titulo";

    episodiosContainer.append(tituloEpisodios);

    // Recorrer los episodios disponibles (máximo 11)
    const totalEpisodios = Math.min(11, personaje.episode.length);

    for (let i = 0; i < totalEpisodios; i++) {
        const urlEpisodio = personaje.episode[i];

        const episodioIndividual = await getElementByURL(
            urlEpisodio,
            "episodio"
        );

        const tarjeta = crearTarjetaEpisodioFav(episodioIndividual);

        if (tarjeta) {
            episodiosContainer.append(tarjeta);
        }
    }

    // =========================
    // AÑADIR TODO AL CONTENEDOR
    // =========================

    container.append(parteSuperior, episodiosContainer);
}

obtenerInfoPersonaje();