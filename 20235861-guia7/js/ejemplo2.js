// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se está utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
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

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = DATE
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE = SELECT
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
        Total de input[type="text"] = ${totText}<br>
        Total de input[type="password"] = ${totPass}<br>
        Total de input[type="radio"] = ${totRadio}<br>
        Total de input[type="checkbox"] = ${totCheck}<br>
        Total de input[type="date"] = ${totDate}<br>
        Total de input[type="email"] = ${totEmail}<br>
        Total de select = ${totSelect}<br>
    `;

    bodyModal.innerHTML = resultado;
    //Funcion que permite mostrar el modal de Bootstrap
    //Esta funcion es definida por Bootstrap
    modal.show();
};

//agregando eventos al boton 
button.onclick = () => {
    recorrerFormulario();
};

document.addEventListener("DOMContentLoaded", () => {
    const modal = new bootstrap.Modal(document.getElementById("idModal"));
    const form = document.forms["frmRegistro"];
    const addButton = document.getElementById("idBtnDiv");
    const button = form.elements["btnRegistro"];
    const bodyModal = document.getElementById("idBodyModal");

    // Evento para mostrar el modal al hacer clic en "Nuevo registro"
    addButton.addEventListener("click", () => {
        bodyModal.innerHTML = "<p>Este es un nuevo control agregado.</p>";
        modal.show();
    });

    // Evento para recorrer el formulario al hacer clic en "Enviar registro"
    button.addEventListener("click", () => {
        if (validateForm()) {
            recorrerFormulario(); // Muestra los resultados en el modal si no hay campos vacíos
            modal.show();
        } else {
            alert("Por favor complete los campos vacíos.");
        }
    });

    // Función para validar si hay campos vacíos
    function validateForm() {
        let isValid = true;
        Array.from(form.elements).forEach(element => {
            if (element.type !== "button" && element.value.trim() === "") {
                isValid = false;
            }
        });
        return isValid;
    }

    // Función para recorrer el formulario y mostrar resultados en el modal
    function recorrerFormulario() {
        let totText = 0;
        let totRadio = 0;
        let totCheck = 0;
        let totDate = 0;
        let totSelect = 0;
        let totFile = 0;
        let totPass = 0;
        let totEmail = 0;

        const elementos = form.elements;
        const totalElementos = elementos.length;

        for (let i = 0; i < totalElementos; i++) {
            const elemento = elementos[i];
            const tipoElemento = elemento.type;
            const tipoNode = elemento.nodeName;

            if (tipoElemento === "text" && tipoNode === "INPUT") totText++;
            else if (tipoElemento === "password" && tipoNode === "INPUT") totPass++;
            else if (tipoElemento === "email" && tipoNode === "INPUT") totEmail++;
            else if (tipoElemento === "radio" && tipoNode === "INPUT") totRadio++;
            else if (tipoElemento === "checkbox" && tipoNode === "INPUT") totCheck++;
            else if (tipoElemento === "file" && tipoNode === "INPUT") totFile++;
            else if (tipoElemento === "date" && tipoNode === "INPUT") totDate++;
            else if (tipoNode === "SELECT") totSelect++;
        }

        const resultado = `
            Total de input[type="text"] = ${totText}<br>
            Total de input[type="password"] = ${totPass}<br>
            Total de input[type="radio"] = ${totRadio}<br>
            Total de input[type="checkbox"] = ${totCheck}<br>
            Total de input[type="date"] = ${totDate}<br>
            Total de input[type="email"] = ${totEmail}<br>
            Total de select = ${totSelect}<br>
        `;

        bodyModal.innerHTML = resultado; // Muestra los resultados sin eliminar al cerrar
    }
});
