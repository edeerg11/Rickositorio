export class Episodio {
    constructor(data) {
        this.id = data.is;
        this.name = data.name;
        this.estreno = data.air_date;
        this.temporada = data.episode.slice(1,3);
        this.episodio =  data.episode.slice(4,6);
        this.personajes = data.characters;
        this.tipo = "episodio";
    }
    


}