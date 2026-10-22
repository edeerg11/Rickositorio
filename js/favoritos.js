/* Lee los identificadores de favoritos guardados en este navegador */
function leerFavoritos() {
    const guardados = localStorage.getItem("ricksplorador-favoritos");

    if (guardados === null) {
        return {
            personajes: [],
            episodios: [],
            lugares: []
        };
    }

    return JSON.parse(guardados);
}