// Esta función crea las tarjetas que utilizarán
// tanto la página de Personajes como la de Favoritos.
/*Al principio estaba intentando crear las mismas tarjetas en Favoritos, 
pero me di cuenta de que estaba duplicando todo el código que ya teníamos en personajes.js.
Así que he separado la parte que construye las tarjetas de la función montarLista() 
y la he llevado a un archivo independiente, tarjetaPersonaje.js, con una función que podemos utilizar los dos.
De esta manera, Personajes sigue obteniendo los datos de la API y Favoritos los recupera de localStorage, 
pero ambas páginas utilizan las mismas tarjetas.
También he añadido la posibilidad de desmarcar los corazones para quitar personajes de Favoritos.
He probado las dos páginas y funcionan. 
No he subido todavía los cambios porque quería que lo viéramos antes, ya que he tenido que tocar un código que no era mío.*/


export function crearTarjetaPersonaje(pj, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Imagen del personaje
    const imgPersonaje = document.createElement("img");
    imgPersonaje.classList.add("imgPersonaje");
    imgPersonaje.src = pj.image;
    imgPersonaje.alt = pj.name;
    divTarjeta.appendChild(imgPersonaje);

    // Cuerpo de la tarjeta
    const divTarjetaBody = document.createElement("div");
    divTarjetaBody.classList.add("tarjetaBody");
    divTarjeta.appendChild(divTarjetaBody);

    // Contenedor de información
    const divInfo = document.createElement("div");
    divInfo.classList.add("info");
    divTarjetaBody.appendChild(divInfo);

    // Nombre
    const p = document.createElement("p");
    p.classList.add("nombre");
    p.textContent = pj.name;
    divInfo.appendChild(p);

    // Información del personaje
    const ul = document.createElement("ul");
    divInfo.appendChild(ul);

    const liEstado = document.createElement("li");
    liEstado.textContent = pj.status;
    ul.appendChild(liEstado);

    const liEspecie = document.createElement("li");
    liEspecie.textContent = pj.species;
    ul.appendChild(liEspecie);

    const liOrigen = document.createElement("li");
    liOrigen.textContent = pj.origin.name;
    ul.appendChild(liOrigen);

    // Recuperar los favoritos guardados
    let favoritos = JSON.parse(
        localStorage.getItem("PersonajesFavorito")
    ) || [];

    // Corazón de favoritos
    const imgFavoritos = document.createElement("img");
    imgFavoritos.classList.add("favorito");

    // Comprobar si el personaje ya es favorito
    const existe = favoritos.find(personaje => personaje.id === pj.id);

    if (existe) {
        imgFavoritos.src = "../img/Corazon_lleno.png";
        imgFavoritos.alt = "Quitar de favoritos";
    } else {
        imgFavoritos.src = "../img/Corazon_vacio.png";
        imgFavoritos.alt = "Añadir a favoritos";
    }

    // Pulsar el corazón
    imgFavoritos.addEventListener("click", function () {

        favoritos = JSON.parse(
            localStorage.getItem("PersonajesFavorito")
        ) || [];

        const encontrado = favoritos.find(
            personaje => personaje.id === pj.id
        );

        if (encontrado) {

            // Quitar de favoritos
            favoritos = favoritos.filter(
                personaje => personaje.id !== pj.id
            );

            imgFavoritos.src = "../img/Corazon_vacio.png";
            imgFavoritos.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }

        } else {

            // Añadir a favoritos
            favoritos.push(pj);

            imgFavoritos.src = "../img/Corazon_lleno.png";
            imgFavoritos.alt = "Quitar de favoritos";
        }

        // Guardar los cambios
        localStorage.setItem(
            "PersonajesFavorito",
            JSON.stringify(favoritos)
        );
    });

    divTarjetaBody.appendChild(imgFavoritos);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        localStorage.setItem("IdPersonaje", pj.id);
        location.href = "infoPersonaje.html";
    });

    const iconVerMas = document.createElement("img");
    iconVerMas.src = "../img/Question-1.svg";
    iconVerMas.classList.add("iconVerMas");
    iconVerMas.alt = "";

    buttonVerMas.appendChild(iconVerMas);
    buttonVerMas.appendChild(document.createTextNode(" Ver más"));

    divTarjeta.appendChild(buttonVerMas);

    // Devolver la tarjeta completa
    return divTarjeta;
}