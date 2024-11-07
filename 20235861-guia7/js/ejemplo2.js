const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

//carrera  seleccionada
function validarSeleccionCarrera() {
    const opcionesCarrera = document.getElementsByName("carrera");
    for (let opcion of opcionesCarrera) {
        if (opcion.checked) return true;
    }
    alert("Por favor, seleccione una carrera.");
    return false;
}

// recorr4er y validar el formulario
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

    const fechaActual = new Date();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let contrasena = "";
    let repetirContrasena = "";

    // un interés está seleccionado
    const intereses = formulario.querySelectorAll('input[name="intereses"]');
    intereses.forEach((interes) => {
        if (interes.checked) interesesSeleccionados = true;
    });

    // se ha seleccionado un país de origen
    const paisOrigen = formulario.elements["paisOrigen"];
    if (paisOrigen && paisOrigen.value !== "") paisSeleccionado = true;

    // formulario para validar
    for (let elemento of formulario.elements) {
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

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

        // fecha de nacimiento
        if (tipoElemento === "date" && tipoNode === "INPUT") {
            const fechaNacimiento = new Date(elemento.value);
            if (fechaNacimiento > fechaActual) fechaInvalida = true;
        }

        //  correo electrónico
        if (tipoElemento === "email" && tipoNode === "INPUT") {
            if (!emailRegex.test(elemento.value)) emailInvalido = true;
        }

        // Verificando contraseñas
        if (tipoElemento === "password" && tipoNode === "INPUT") {
            if (!contrasena) {
                contrasena = elemento.value;
            } else {
                repetirContrasena = elemento.value;
                if (contrasena !== repetirContrasena) contrasenaNoCoincide = true;
            }
        }
    }

    // Mensajes de error si las validaciones fallan
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
        return;
    }
    if (!paisSeleccionado) {
        alert("Por favor, seleccione un país de origen.");
        return;
    }

    // Mostrando resultados en el modal si todo es válido
    mostrarResultados(totText, totPass, totRadio, totCheck, totDate, totEmail, totSelect);
};

function mostrarResultados(totText, totPass, totRadio, totCheck, totDate, totEmail, totSelect) {
    bodyModal.innerHTML = ""; // Limpiando contenido previo

    // Agregando conteo de tipos de inputs
    const conteoDiv = document.createElement("div");
    conteoDiv.innerHTML = `
        Total de input[type="text"]: ${totText}<br>
        Total de input[type="password"]: ${totPass}<br>
        Total de input[type="radio"]: ${totRadio}<br>
        Total de input[type="checkbox"]: ${totCheck}<br>
        Total de input[type="date"]: ${totDate}<br>
        Total de input[type="email"]: ${totEmail}<br>
        Total de select: ${totSelect}<br>
    `;
    bodyModal.appendChild(conteoDiv);

    // Crear tabla de resultados
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const thCampo = document.createElement("th");
    thCampo.textContent = "Campo";
    headerRow.appendChild(thCampo);

    const thValor = document.createElement("th");
    thValor.textContent = "Valor";
    headerRow.appendChild(thValor);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    // Captura de valores del formulario
    agregarFila(tbody, "Nombres", formulario["idNombre"].value);
    agregarFila(tbody, "Apellidos", formulario["idApellidos"].value);
    agregarFila(tbody, "Fecha de Nacimiento", formulario["idFechaNac"].value);
    agregarFila(tbody, "Correo", formulario["idCorreo"].value);
    agregarFila(tbody, "Contraseña", formulario["idPassword"].value);

    // Captura de intereses seleccionados
    const interesesSeleccionados = [];
    document.querySelectorAll("input[name='intereses']:checked").forEach((checkbox) => {
        interesesSeleccionados.push(checkbox.nextElementSibling.textContent);
    });
    agregarFila(tbody, "Intereses", interesesSeleccionados.join(", "));

    // Captura de carrera seleccionada
    const carreraSeleccionada = document.querySelector("input[name='carrera']:checked");
    if (carreraSeleccionada) {
        agregarFila(tbody, "Carrera", carreraSeleccionada.nextElementSibling.textContent);
    }

    // Captura del país seleccionado
    const paisOrigen = formulario["paisOrigen"];
    agregarFila(tbody, "País", paisOrigen.options[paisOrigen.selectedIndex].text);

    table.appendChild(tbody);
    bodyModal.appendChild(table);
    modal.show();
}

function agregarFila(tbody, campo, valor) {
    const row = document.createElement("tr");
    const cellCampo = document.createElement("td");
    cellCampo.textContent = campo;
    const cellValor = document.createElement("td");
    cellValor.textContent = valor;
    row.appendChild(cellCampo);
    row.appendChild(cellValor);
    tbody.appendChild(row);
}

// Asociar evento al botón
button.addEventListener("click", recorrerFormulario);
