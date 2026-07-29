// Array que almacena todas las tareas de la aplicación.
let tareas = [];

/**
 * Devuelve todas las tareas almacenadas.
 *
 * @returns {Array}
 */
export function obtenerTareas() {
    return tareas;
}

/**
 * Crea una tarea nueva y la agrega al array.
 *
 * @param {string} texto
 * @returns {Object}
 */
export function agregarTarea(texto) {
    const textoLimpio = texto.trim();
    if (textoLimpio === "") {
        return null;
    }
    const nuevaTarea = {
        id: Date.now(),
        texto: textoLimpio,
        completada: false
    };
    tareas.push(nuevaTarea)
    return nuevaTarea;
}

/**
 * Cambia el estado de una tarea entre pendiente y completada.
 *
 * @param {number} id
 * @returns {boolean}
 */
export function alternarEstadoTarea(id) {
    const tareaEncontrada = tareas.find((tarea) => tarea.id === id);

    if (!tareaEncontrada) {
        return false;
    }

    tareaEncontrada.completada = !tareaEncontrada.completada;

    return true;
}

/**
 * Elimina una tarea utilizando su identificador.
 *
 * @param {number}
 * @returns {boolean}
 */
export function eliminarTarea(id) {
    const cantidadAnterior = tareas.length;

    tareas = tareas.filter((tarea) => tarea.id !== id);

    return tareas.length < cantidadAnterior;
}

/**
 * Reemplaza el array actual por otro array de tareas.
 *
 * @param {Array} nuevasTareas
 */
export function establecerTareas(nuevasTareas) {
    if (!Array.isArray(nuevasTareas)) {
        tareas = [];
        return;
    }

    tareas = nuevasTareas;
}