/* 
Crea una tarjeta para mostrar un personaje favorito.
En Personajes:
Pulsar el corazón va a guardar el personaje.

En Favoritos:
Leer los personajes guardados va a mostrar sus tarjetas.
Pulsar el corazón de una tarjeta:
quitar ese personaje de la lista
actualizar localStorage
retirar su tarjeta de la página */

export function crearTarjetaPersonajeFav(personaje) {
    // Uso la misma clase que las tarjetas de personajes.
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;

    const nombre = document.createElement("p");
    nombre.textContent = personaje.name;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);

    // Muestro los mismo datos que aparecen en Personajes.

    const info = document.createElement("div");
    info.classList.add("info");

    const lista = document.createElement("ul");

    const estado = document.createElement("li");
    estado.textContent = personaje.status;.

    const especie = document.createElement("li");
    especie.textContent = personaje.species;

    const origen = document.createElement("li");
    origen.textContent = personaje.origin.name;

    lista.appendChild(estado);
    lista.appendChild(especie);
    lista.appendChild(origen);

    info.appendChild(lista);
    tarjeta.appendChild(info);

    return tarjeta;
}