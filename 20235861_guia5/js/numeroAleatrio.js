// Generamos un número aleatorio que se encuentra en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Creamos una constante que permite identificar el máximo de intentos
const numeroIntentos = 3;
// Guardará el número de intentos que realiza el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    // Definimos una variable para impresión de mensajes
    let mensaje;
    // Utilizamos el DOM para acceder al párrafo creado
    const parrafo = document.querySelector("#idParrafo");

    // Verificamos en qué intento está el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        // Convertimos el número ingresado a un número entero
        numero = parseInt(numero);

        // Verificamos si el número ingresado es un número válido
        if (isNaN(numero)) {
            mensaje = "Por favor, ingresa un número válido.";
        } else if (numero < 1 || numero > 25) {
            mensaje = "Por favor, ingresa un número entre 1 y 25.";
        } else {
            // Verificamos el número aleatorio
            if (numero === numeroAleatorio) {
                mensaje = `¡Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
            } else if (intentos === numeroIntentos) {
                mensaje = `Su número de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
            } else {

                if (numero < numeroAleatorio) {
                    mensaje = `El número es más alto. Vuelve a intentar. Quedan ${
                        numeroIntentos - intentos
                    } intentos.`;
                } else {
                    mensaje = `El número es más bajo. Vuelve a intentar. Quedan ${
                        numeroIntentos - intentos
                    } intentos.`;
                }
            }
        }

        // Aumentamos el valor de los intentos 
        intentos++;
    } else {
        mensaje = `Su número de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}
