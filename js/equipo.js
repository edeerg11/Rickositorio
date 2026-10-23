const franjaEquipo = document.querySelector(".equipo-franja");
const nombresEquipo = document.querySelector(".equipo");
let posicionX = 0;
let velocidadX= 0.5;

function moverEquipo() {
    posicionX = posicionX + velocidadX;
    nombresEquipo.style.transform = `translateX(${posicionX}px)`;
    requestAnimationFrame(moverEquipo);
}

requestAnimationFrame(moverEquipo);

function moverEquipo() {
    const espacio = franjaEquipo.clientWidth - nombresEquipo.offsetWidth;

    const limiteIzquierdo = Math.min(0, espacio);
    const limiteDerecho = Math.max(0, espacio);

    posicionX = posicionX + velocidadX;

    if (posicionX >= limiteDerecho) {
        posicionX = limiteDerecho;
        velocidadX = -Math.abs(velocidadX);
    }

    if (posicionX <= limiteIzquierdo) {
        posicionX = limiteIzquierdo;
        velocidadX = Math.abs(velocidadX);
    }

    nombresEquipo.style.transform = `translateX(${posicionX}px)`;

    requestAnimationFrame(moverEquipo);
}