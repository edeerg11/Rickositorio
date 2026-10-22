function buildGridEpisodes(data){
    let tarjetas = [];
    for(tarjeta of tarjetas){
        buildCardEpisode(data);
    }
}

function buildCardEpisode(data){
    //Crea tarjeta.
    let card = document.createElement("div");
    card.classList.add("card-episode");
    //Crea e inserta datos de episodio
    let elem = document.createElement("div");
    elem.classList.add("data-episode");
    elem.innerText(`<Nombre-episodio> | <SXXTYY>`);
    card.append(elem);
    //crea e inserta controles del episodio
    card.append(buildControlsEpisode(data));
    return card;
}
function buildControlsEpisode(data){
    //Crea contenedor
    let consEp = document.createElement("div");
    consEp.classList.add("controls-episode");
    //Crea botón de saber más
    let elem = document.createElement("div");
    elem.classList.add("button-more");
    //Crea enlace de saber más e inserta en el botón
    let link = document.createElement("a");
    link.href=""
    link.innerText="Saber más";
    elem.append(link);
    //Inserta botón de saber más
    consEp.append(elem);
    //crea e inserta botón de favoritos
    elem = document.createElement("div");
    elem.classList.add("button-fav");
    let img = elem.append(document.createElement("img"));
    img.alt="&hearts;";
    img.src="../img/Heart.svg";
    elem.append(img);

    consEp.append(elem);
    return consEp;
}