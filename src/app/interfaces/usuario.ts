// Estructura que contiene los datos de la API REST.

import { Asignaturas } from "./asignaturas";

export interface Usuario {
    id?: number,
    dv?: string,
    primerNombre?: string,
    segundoNombre?: string,
    paternoApellido?: string,
    maternoApellido?: string,
    correo?: string,
    contraseña?: string,
    asignaturas?: Array<Asignaturas>
}
