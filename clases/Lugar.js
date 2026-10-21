export class Lugar {
    constructor(data) {
        this.id = data.is;
        this.name = data.name;
        this.type = data.type;
        this.dimension = data.dimension;
        this.residents = data.residents;
        this.created = data.created;
        this.tipo = "lugar";
    }

    /**
     * numero de resinetes del lugar.
     * @returns {number} Numero de residentes le lugar
     */
    countResidents() {
        return this.residents.length || "No hay nadie quien quera estar aqui.";
    }

}