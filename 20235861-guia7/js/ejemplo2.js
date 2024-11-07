// Obteniendo la referencia de los elementos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
const bodyModal = document.getElementById("idBodyModal");

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

    // Obteniendo la fecha actual
    const fechaActual = new Date();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
    let contrasena = "";
    let repetirContrasena = "";

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        // Verificando si el campo está vacío
        if ((tipoElemento === "text" || tipoElemento === "password" || tipoElemento === "email" || tipoElemento === "date") && elemento.value === "") {
            camposVacios.push(elemento);
        }

        // Validando la fecha de nacimiento
        if (tipoElemento === "date" && tipoNode === "INPUT") {
            const fechaNacimiento = new Date(elemento.value);
            if (fechaNacimiento > fechaActual) {
                fechaInvalida = true;
            }
            totDate++;
        }

        // Validando el formato del correo electrónico
        if (tipoElemento === "email" && tipoNode === "INPUT") {
            if (!emailRegex.test(elemento.value)) {
                emailInvalido = true;
            }
            totEmail++;
        }

        // Guardando valores de contraseña y repetir contraseña
        if (tipoElemento === "password" && tipoNode === "INPUT") {
            if (!contrasena) {
                contrasena = elemento.value; // Primer campo de contraseña
            } else {
                repetirContrasena = elemento.value; // Segundo campo de contraseña
                if (contrasena !== repetirContrasena) {
                    contrasenaNoCoincide = true;
                }
            }
            totPass++;
        }

        // Validación de al menos un interés seleccionado
        if ((tipoElemento === "checkbox" || tipoElemento === "radio") && elemento.name === "intereses" && elemento.checked) {
            interesesSeleccionados = true;
            break; // Sale del bucle en cuanto encuentra una opción seleccionada
        }

        // Contabilizando el tipo de elemento
        if (tipoElemento === "text" && tipoNode === "INPUT") {
            totText++;
        } else if (tipoElemento === "radio" && tipoNode === "INPUT") {
            totRadio++;
        } else if (tipoElemento === "checkbox" && tipoNode === "INPUT") {
            totCheck++;
        } else if (tipoElemento === "file" && tipoNode === "INPUT") {
            totFile++;
        } else if (tipoNode === "SELECT") {
            totSelect++;
        }
    } // Fin del bucle for

    if (camposVacios.length > 0) {
        alert("Por favor, rellene los campos vacíos.");
    } else if (fechaInvalida) {
        alert("La fecha de nacimiento no puede ser una fecha futura.");
    } else if (emailInvalido) {
        alert("Por favor, ingrese un correo electrónico válido.");
    } else if (contrasenaNoCoincide) {
        alert("Las contraseñas no coinciden. Por favor, verifique.");
    } else if (!interesesSeleccionados) {
        alert("Por favor, seleccione al menos un interés.");
    } else {
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
    }
};

//agregando eventos al boton 
button.onclick = () => {
    recorrerFormulario();
}; 
