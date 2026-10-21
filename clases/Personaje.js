export class Personaje{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.species = data.species;
        this.type = data.type;
        this.gender = data.gender;
        this.origin = data.origin;
        this.location = data.location;
        this.image = data.image;
        this.episode = data.episode;
        this.url = data.url;
        this.created = data.created;
        this.tipo = "personaje";
    }

    /**
     * Comprueba si el personaje esta vivo.
     * @returns Booleando de si el personaje esta vivo o no.
     */
    isAlive(){
        return this.status ==="Alive";
    }


    /**
     * Filtra personajes por nombre
     * @param {Personaje[]} personajeArray es el array COMPLETO de personajes(en caso de solo haber un filtro) o parcial en caso varios
     * @param {string} nombre es el nombre en string del personaje a buscar
     * @returns {Personaje[]} Personajes cuyo nombre coincida con el texto buscado
     *  
     */
    static filterByName(personajeArray, nombre){
        return personajeArray.filter(
            personaje =>
                personaje.name.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    /**
     * Filtra Personajes por estado.
     * @param {Personaje[]} personajeArray 
     * @param {string} status 
     * @returns {Personaje[]} personajes que coincidan con el estado.
     */
    static filtrerByStatus(personajeArray, status){
        return personajeArray.filter(
            personaje =>
                personaje.status === status
        );
    }
    
}