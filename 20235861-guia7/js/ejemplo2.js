// Obteniendo la referencia de los elementos
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

// Función para verificar si una carrera está seleccionada
function validarSeleccionCarrera() {
    const opcionesCarrera = document.getElementsByName('carrera'); // Cambiado a 'carrera'
    for (let opcion of opcionesCarrera) {
        if (opcion.checked) {
            return true; // Si se encuentra una opción seleccionada, retorna true
        }
    }
    alert('Por favor, seleccione una carrera.');
    return false;
}

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;
    let camposVacios = [];
    let fechaInvalida = false;
    let emailInvalido = false;
    let contrasenaNoCoincide = false;
    let interesesSeleccionados = false;
    let paisSeleccionado = false;

    // Obteniendo la fecha actual
    const fechaActual = new Date();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
    let contrasena = "";
    let repetirContrasena = "";

    // Verificar si al menos un interés está seleccionado
    const intereses = formulario.querySelectorAll('input[name="intereses"]');
    intereses.forEach((interes) => {
        if (interes.checked) {
            interesesSeleccionados = true;
        }
    });

    // Verificar si se ha seleccionado un país de origen
    const paisOrigen = formulario.elements["paisOrigen"];
    if (paisOrigen && paisOrigen.value !== "") {
        paisSeleccionado = true;
    }

    // Recorriendo elementos del formulario para otras validaciones
    for (let elemento of formulario.elements) {
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        // Verificando si el campo está vacío
        if ((tipoElemento === "text" || tipoElemento === "password" || tipoElemento === "email" || tipoElemento === "date") && elemento.value === "") {
            camposVacios.push(elemento);
        }

        // Contadores de tipos de elementos
        if (tipoElemento === "text") totText++;
        if (tipoElemento === "radio") totRadio++;
        if (tipoElemento === "checkbox") totCheck++;
        if (tipoElemento === "date") totDate++;
        if (tipoElemento === "select-one") totSelect++;
        if (tipoElemento === "file") totFile++;
        if (tipoElemento === "password") totPass++;
        if (tipoElemento === "email") totEmail++;

        // Validando la fecha de nacimiento
        if (tipoElemento === "date" && tipoNode === "INPUT") {
            const fechaNacimiento = new Date(elemento.value);
            if (fechaNacimiento > fechaActual) {
                fechaInvalida = true;
            }
        }

        // Validando el formato del correo electrónico
        if (tipoElemento === "email" && tipoNode === "INPUT") {
            if (!emailRegex.test(elemento.value)) {
                emailInvalido = true;
            }
        }

        // Guardando valores de contraseña y repetir contraseña
        if (tipoElemento === "password" && tipoNode === "INPUT") {
            if (!contrasena) {
                contrasena = elemento.value;
            } else {
                repetirContrasena = elemento.value;
                if (contrasena !== repetirContrasena) {
                    contrasenaNoCoincide = true;
                }
            }
        }
    }

    // Validaciones y mensajes de error
    if (camposVacios.length > 0) {
        alert("Por favor, rellene los campos vacíos.");
        return;
    }
    if (fechaInvalida) {
        alert("La fecha de nacimiento no puede ser una fecha futura.");
        return;
    }
    if (emailInvalido) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }
    if (contrasenaNoCoincide) {
        alert("Las contraseñas no coinciden. Por favor, verifique.");
        return;
    }
    if (!interesesSeleccionados) {
        alert("Por favor, seleccione al menos un interés.");
        return;
    }
    if (!validarSeleccionCarrera()) {
        return; // Si no se selecciona una carrera, detener la ejecución
    }
    if (!paisSeleccionado) {
        alert("Por favor, seleccione un país de origen.");
        return;
    }

    // Mostrar resultados en el modal si todo es válido
    let resultado = 
        `Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>`;

    bodyModal.innerHTML = resultado;
    modal.show();
};

// Agregando eventos al botón 
button.onclick = () => {
    recorrerFormulario();
};
