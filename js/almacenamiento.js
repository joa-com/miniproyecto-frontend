const CLAVE_TAREAS = "tareas";

/**
 * Guarda el array de tareas en LocalStorage.
 *
 * @param {Array} tareas
 */
export function guardarTareas(tareas) {
    const tareasComoTexto = JSON.stringify(tareas);

    localStorage.setItem(CLAVE_TAREAS, tareasComoTexto);
}

/**
 * Recupera las tareas almacenadas.
 *
 * @returns {Array}
 */
export function cargarTareas() {

    const tareasGuardadas =
        localStorage.getItem(CLAVE_TAREAS);

    if (tareasGuardadas === null) {
        return [];
    }

    return JSON.parse(tareasGuardadas);

}