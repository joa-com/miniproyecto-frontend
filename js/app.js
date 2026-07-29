import {
    obtenerTareas,
    agregarTarea,
    establecerTareas,
    alternarEstadoTarea,
    eliminarTarea
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
        const contenidoTarea = document.createElement("div");
        const casillaCompletada = document.createElement("input");
        const textoTarea = document.createElement("p");
        const botonEliminar = document.createElement("button");
        elementoTarea.classList.add("tarea");
        elementoTarea.dataset.id = tarea.id;
        contenidoTarea.classList.add("contenido-tarea");
        casillaCompletada.type = "checkbox";
        casillaCompletada.classList.add("casilla-tarea");
        casillaCompletada.checked = tarea.completada;
        casillaCompletada.setAttribute(
            "aria-label",
            `Marcar como completada: ${tarea.texto}`
        );
        textoTarea.textContent = tarea.texto;
        textoTarea.classList.add("texto-tarea");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-eliminar");
        if (tarea.completada) {
            elementoTarea.classList.add("completada");
        }
        contenidoTarea.appendChild(casillaCompletada);
        contenidoTarea.appendChild(textoTarea);
        elementoTarea.appendChild(contenidoTarea);
        elementoTarea.appendChild(botonEliminar);
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

function manejarInteraccionLista(evento) {
    const elementoPresionado = evento.target;
    const elementoTarea = elementoPresionado.closest(".tarea");
    if (!elementoTarea) {
        return;
    }
    const idTarea = Number(elementoTarea.dataset.id);
    if (elementoPresionado.classList.contains("casilla-tarea")) {
        alternarEstadoTarea(idTarea);
    }
    if (elementoPresionado.classList.contains("boton-eliminar")) {
        eliminarTarea(idTarea);
    }
    guardarTareas(obtenerTareas());
    renderizarTareas();
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

listaTareas.addEventListener(
    "click",
    manejarInteraccionLista
);

iniciarAplicacion();