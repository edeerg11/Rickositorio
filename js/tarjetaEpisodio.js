// Creo una tarjeta para cada episodio favorito.

let favoritosEpisodios = JSON.parse(
    localStorage.getItem("episodiosFavorito")
) || [];


export function crearTarjetaEpisodioFav(episodio, esListaFavoritos = false) {

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

    function actualizarCorazon() {
        const encontrado = favoritosEpisodios.some(
            episodioLista => episodioLista.id === episodio.id
        );

        corazon.src = encontrado
            ? "../img/Corazon_lleno.png"
            : "../img/Heart.png";

        corazon.alt = encontrado
            ? "Quitar de favoritos"
            : "Añadir a favoritos";
    }

    // Mostrar el corazón correcto al crear la tarjeta
    actualizarCorazon();

    botonFavorito.appendChild(corazon);

    // Añadir o quitar el episodio de favoritos
    botonFavorito.addEventListener("click", function () {

        const encontrado = favoritosEpisodios.some(
            episodioLista => episodioLista.id === episodio.id
        );

        if (encontrado) {
            // Quitar de favoritos
            favoritosEpisodios = favoritosEpisodios.filter(
                episodioFav => episodioFav.id !== episodio.id
            );
            if (esListaFavoritos) {
                tarjeta.remove();
            }

        } else {
            // Añadir solo si no existe
            favoritosEpisodios.push(episodio);
        }

        // Actualizar el corazón
        actualizarCorazon();

        // Guardar los cambios en localStorage
        localStorage.setItem(
            "episodiosFavorito",
            JSON.stringify(favoritosEpisodios)
        );

        console.log(favoritosEpisodios);
    });

    // Uno los elementos
    controles.appendChild(contenedorEnlace);
    controles.appendChild(botonFavorito);

    tarjeta.appendChild(datos);
    tarjeta.appendChild(controles);

    return tarjeta;
}


