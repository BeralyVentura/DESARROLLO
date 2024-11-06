// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar"); // Referencia al botón de validación

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    //validando que se haya seleccionado un elemento
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

// Función de creación de elementos con verificación de ID único
const createNewElement = function (elementType) {
    const id = `id${nombreElemento.value}`;

    // Verificación de duplicados
    if (document.getElementById(id)) {
        alert("Error: No se permite agregar controles con el mismo ID.");
        return;
    }

    let addElemento;
    if (elementType === "select") {
        addElemento = document.createElement("select");
        addElemento.className = "form-select";
        
        for (let i = 1; i <= 10; i++) {
            const addOption = document.createElement("option");
            addOption.value = i;
            addOption.innerHTML = `Opcion ${i}`;
            addElemento.appendChild(addOption);
        }
    } else if (elementType === "radio" || elementType === "checkbox") {
        addElemento = document.createElement("input");
        addElemento.type = elementType;
        addElemento.className = "form-check-input";
    } else if (elementType === "color" || elementType === "email") {
        addElemento = document.createElement("input");
        addElemento.type = elementType;
        addElemento.className = "form-control";
    } else {
        addElemento = elementType === "textarea" ? document.createElement("textarea") : document.createElement("input");
        addElemento.type = elementType;
        addElemento.className = "form-control";
    }

    addElemento.id = id;
    addElemento.name = nombreElemento.value;
    addElemento.placeholder = tituloElemento.value;

    // Crear etiquetas
    const labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    const labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    const divElemento = document.createElement("div");
    divElemento.className = elementType === "radio" || elementType === "checkbox" ? "form-check" : "form-floating mb-3";
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    // Agregar al formulario
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

    // Mostrar el botón de validación si es la primera vez que se agrega un elemento
    if (newForm.children.length > 0) {
        buttonValidar.style.display = "inline-block";
    }
};

// Función de validación de formulario
const validarFormulario = function () {
    let formularioValido = true;
    let mensajesError = [];

    Array.from(newForm.elements).forEach((elemento) => {
        if (["text", "textarea", "number", "date", "password", "email"].includes(elemento.type)) {
            if (elemento.value.trim() === "") {
                formularioValido = false;
                mensajesError.push(`El campo "${elemento.placeholder}" está vacío.`);
            }
        } else if (elemento.type === "select-one") {
            if (elemento.selectedIndex === 0) {
                formularioValido = false;
                mensajesError.push(`No ha seleccionado una opción en "${elemento.previousSibling.textContent}".`);
            }
        } else if (elemento.type === "radio" || elemento.type === "checkbox") {
            const radiosCheckboxes = document.getElementsByName(elemento.name);
            const algunoSeleccionado = Array.from(radiosCheckboxes).some((el) => el.checked);
            if (!algunoSeleccionado) {
                formularioValido = false;
                mensajesError.push(`No ha seleccionado una opción en "${elemento.nextSibling.textContent}".`);
            }
        }
    });

    if (formularioValido) {
        alert("Todos los campos están llenos y válidos.");
    } else {
        alert("Errores de validación:\n" + mensajesError.join("\n"));
    }
};

// Asignar la función al evento click del botón de validación
buttonValidar.onclick = validarFormulario;

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value !== "" && tituloElemento.value !== "") {
        const elementType = cmbElemento.value;
        createNewElement(elementType);
    } else {
        alert("Faltan campos por completar");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
