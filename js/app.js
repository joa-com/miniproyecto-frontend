import {
    obtenerTareas,
    agregarTarea,
    establecerTareas
} from "./tareas.js";

import {
    guardarTareas,
    cargarTareas
} from "./almacenamiento.js";


const formularioTarea = document.getElementById("formulario-tarea");
const inputTarea = document.getElementById("texto-tarea");
const mensajeError = document.getElementById("mensaje-error");
const listaTareas = document.getElementById("lista-tareas");
const mensajeListaVacia = document.getElementById("mensaje-lista-vacia");
const contadorPendientes = document.getElementById("contador-pendientes");


function renderizarTareas() {
    const tareas = obtenerTareas();

    listaTareas.innerHTML = "";

    tareas.forEach((tarea) => {
        const elementoTarea = document.createElement("li");
        const textoTarea = document.createElement("p");

        elementoTarea.classList.add("tarea");
        elementoTarea.dataset.id = tarea.id;

        textoTarea.textContent = tarea.texto;

        elementoTarea.appendChild(textoTarea);
        listaTareas.appendChild(elementoTarea);
    });

    actualizarInterfaz(tareas);
}


function actualizarInterfaz(tareas) {
    const cantidadPendientes = tareas.filter(
        (tarea) => !tarea.completada
    ).length;

    contadorPendientes.textContent = cantidadPendientes;

    mensajeListaVacia.hidden = tareas.length > 0;
}


function manejarEnvioFormulario(evento) {
    evento.preventDefault();

    const textoIngresado = inputTarea.value;
    const nuevaTarea = agregarTarea(textoIngresado);

    if (nuevaTarea === null) {
        mensajeError.textContent =
            "La descripción de la tarea no puede estar vacía.";

        inputTarea.focus();
        return;
    }

    mensajeError.textContent = "";

    guardarTareas(obtenerTareas());
    renderizarTareas();

    formularioTarea.reset();
    inputTarea.focus();
}


function iniciarAplicacion() {
    const tareasGuardadas = cargarTareas();

    establecerTareas(tareasGuardadas);
    renderizarTareas();
}


formularioTarea.addEventListener(
    "submit",
    manejarEnvioFormulario
);

iniciarAplicacion();