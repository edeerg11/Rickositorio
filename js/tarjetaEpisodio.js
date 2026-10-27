// Creo una tarjeta para cada episodio favorito.

let favoritosEpisodios = JSON.parse(
    localStorage.getItem("episodiosFavorito")
) || [];
export function crearTarjetaEpisodioFav(episodio) {

    // Tarjeta principal
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card-episode");

    // Información del episodio
    const datos = document.createElement("div");
    datos.classList.add("data-episode");

    // Icono de película
    const icono = document.createElement("span");
    icono.textContent = "🎞";

    // Nombre, temporada y episodio
    const nombre = document.createElement("span");
    nombre.textContent =
        `${episodio.name} | T${episodio.temporada}E${episodio.episodio}`;

    datos.appendChild(icono);
    datos.appendChild(nombre);

    // Contenedor de los botones
    const controles = document.createElement("div");
    controles.classList.add("controls-episode");

    // Botón Saber más
    const contenedorEnlace = document.createElement("div");
    contenedorEnlace.classList.add("button-more");

    const enlace = document.createElement("a");
    enlace.href = "episodio.html";
    enlace.textContent = "Saber más";

    enlace.addEventListener("click", function () {
        localStorage.setItem("idEpisodio", episodio.id);
    });

    contenedorEnlace.appendChild(enlace);

    // Corazón de favoritos
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("button-fav");
    botonFavorito.type = "button";

    const corazon = document.createElement("img");
    corazon.src = "../img/Corazon_lleno.png";
    corazon.alt = "Quitar de favoritos";

    botonFavorito.appendChild(corazon);

    // Quitar el episodio de favoritos
    botonFavorito.addEventListener("click", function () {
        // Quitar de favoritos
        favoritosEpisodios = favoritosEpisodios.filter(
            episodioFav => episodioFav.id !== episodio.id
        );
        localStorage.setItem(
            "episodiosFavorito",
            JSON.stringify(favoritosEpisodios)
        );
        tarjeta.remove();
    });

    // Uno los elementos
    controles.appendChild(contenedorEnlace);
    controles.appendChild(botonFavorito);

    tarjeta.appendChild(datos);
    tarjeta.appendChild(controles);

    return tarjeta;
}


