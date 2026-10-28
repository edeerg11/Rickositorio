import { getLugar, getElementByURL } from "./main.js";
import { crearTarjetaPersonaje } from "./tarjetaPersonaje.js";

const id = new URLSearchParams(location.search).get("id");
const contenedor = document.getElementById("detalle-lugar");
const contenedorResidentes = document.getElementById("residentes");

async function mostrarDetalle() {
    const lugar = await getLugar(id);
    contenedor.innerHTML = contenedor.innerHTML = `
    <div class="detalle">
        <span class="detalle-tipo">${lugar.type}</span>
        <h2 class="detalle-nombre">${lugar.name}</h2>

        <div class="detalle-datos">
            <div class="dato">
                <span class="dato-valor">${lugar.dimension}</span>
                <span class="dato-etiqueta">Dimensión</span>
            </div>
            <div class="dato">
                <span class="dato-valor">${lugar.countResidents()}</span>
                <span class="dato-etiqueta">Residentes</span>
            </div>
        </div>

        <a class="detalle-volver" href="lugares.html">← Volver a localizaciones</a>
    </div>
`;
    await mostrarResidentes(lugar);
}
async function mostrarResidentes(lugar) {
    if (lugar.residents.length === 0) {
        contenedorResidentes.textContent = "Nadie vive aquí.";
        return;
    }

    const personajes = await Promise.all(
        lugar.residents.map(url => getElementByURL(url))
    );

    personajes.forEach(function (personaje) {
        contenedorResidentes.appendChild(crearTarjetaPersonaje(personaje));
    });
}
mostrarDetalle();