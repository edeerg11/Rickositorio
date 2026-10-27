export function crearTarjetaLugar(lugar, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Icono del lugar
    const imgLugar = document.createElement("img");
    imgLugar.classList.add("iconoLugar");
    imgLugar.src = "../img/Planet.png";
    imgLugar.alt = "";
    divTarjeta.appendChild(imgLugar);

    // Cuerpo de la tarjeta
    const divTarjetaBody = document.createElement("div");
    divTarjetaBody.classList.add("tarjetaBody");
    divTarjeta.appendChild(divTarjetaBody);

    // Información
    const divInfo = document.createElement("div");
    divInfo.classList.add("info");
    divTarjetaBody.appendChild(divInfo);

    const p = document.createElement("p");
    p.classList.add("nombre");
    p.textContent = lugar.name;
    divInfo.appendChild(p);

    const ul = document.createElement("ul");
    divInfo.appendChild(ul);

    const liTipo = document.createElement("li");
    liTipo.textContent = lugar.type;
    ul.appendChild(liTipo);

    const liDimension = document.createElement("li");
    liDimension.textContent = lugar.dimension;
    ul.appendChild(liDimension);

    // Corazón de favoritos
    let favoritos = JSON.parse(localStorage.getItem("LugaresFavorito")) || [];

    const imgFavoritos = document.createElement("img");
    imgFavoritos.classList.add("favorito");

    if (favoritos.find(l => l.id === lugar.id)) {
        imgFavoritos.src = "../img/Corazon_lleno.png";
        imgFavoritos.alt = "Quitar de favoritos";
    } else {
        imgFavoritos.src = "../img/Heart.png";
        imgFavoritos.alt = "Añadir a favoritos";
    }

    imgFavoritos.addEventListener("click", function () {
        favoritos = JSON.parse(localStorage.getItem("LugaresFavorito")) || [];

        if (favoritos.find(l => l.id === lugar.id)) {
            // Quitar de favoritos
            favoritos = favoritos.filter(l => l.id !== lugar.id);
            imgFavoritos.src = "../img/Heart.png";
            imgFavoritos.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }
        } else {
            // Añadir a favoritos
            favoritos.push(lugar);
            imgFavoritos.src = "../img/Corazon_lleno.png";
            imgFavoritos.alt = "Quitar de favoritos";
        }

        localStorage.setItem("LugaresFavorito", JSON.stringify(favoritos));
    });

    divTarjetaBody.appendChild(imgFavoritos);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        location.href = "singlelocalizacion.html?id=" + lugar.id;
    });

    const iconVerMas = document.createElement("img");
    iconVerMas.src = "../img/Info.png";
    iconVerMas.classList.add("iconVerMas");
    iconVerMas.alt = "";

    buttonVerMas.appendChild(iconVerMas);
    buttonVerMas.appendChild(document.createTextNode(" Ver más"));

    divTarjeta.appendChild(buttonVerMas);

    return divTarjeta;
}