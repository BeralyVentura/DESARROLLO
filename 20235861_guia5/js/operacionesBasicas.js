//Accedemos al parrafo que nos permitira imprimir el resultado
const parrafo = document. querySelector ("#idParrafo");
console.log (parrafo);

//Accedemos a cada boton por medio de la API DOM
const btnSumar = document.querySelector ("#idBtnSumar");
const btnRestar = document.querySelector ("#idBtnRestar");
const btnMultiplicar = document.querySelector ("#idBtnMultiplicar");
const btnDividir = document.querySelector ("#idBtnDividir");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizará la operación
btnSumar.addEventListener ("click",sumar);
btnRestar .addEventListener("click", restar); 
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

//Creamos la variable que tendra el valor del resultado de la operación matematica
let resultado;

//Función para sumar
function sumar() {
    let numero1 = prompt("Ingrese el primer número a sumar");
    let numero2 = prompt("Ingrese el segundo número a sumar");
    resultado = numero1 * 1 + numero2 * 1; // Multiplicar por 1 para convertir en número
    parrafo.innerHTML = `${numero1} + ${numero2} = ${resultado}`;
}

//Función para restar
function restar() {
    let numero1 = prompt("Ingrese el primer número a restar");
    let numero2 = prompt("Ingrese el segundo número a restar");
    resultado = numero1 * 1 - numero2 * 1;
    parrafo.innerHTML = `${numero1} - ${numero2} = ${resultado}`;
}

//Función para multiplicar
function multiplicar() {
    let numero1 = prompt("Ingrese el primer número a multiplicar");
    let numero2 = prompt("Ingrese el segundo número a multiplicar");
    resultado = numero1 * 1 * numero2 * 1;
    parrafo.innerHTML = `${numero1} * ${numero2} = ${resultado}`;
}

//Función para dividir
function dividir() {
    let numero1 = prompt("Ingrese el primer número a dividir");
    let numero2 = prompt("Ingrese el segundo número a dividir");
    let mensaje;
    if (numero2 * 1 !== 0) {
        resultado = numero1 * 1 / numero2 * 1;
        mensaje = `${numero1} / ${numero2} = ${resultado}`;
    } else {
        mensaje = `El valor ${numero1} / ${numero2} no se puede dividir`;
    }

    parrafo.innerHTML = mensaje;
}