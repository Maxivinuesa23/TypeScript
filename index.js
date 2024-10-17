import prompSync from 'prompt-sync';
const scc = prompSync();
let fecha = new Date();
const tareas = [];
let opc = 0;
let opc1 = 0;
let opc2 = 0;
let opc3 = 0;
let id = 0;
let titulo = "";
let descripcion = "";
let estado = "";
let creacion;
let vencimiento;
let dificultad = "";
let identificador = 0;
let i = 0;
let dia, mes, anio = 0;
let control, control1, bandera = 0;
let contador;
let pendiente = "❗ Pendiente";
let enCurso = "🛠 En curso";
let terminada = "✔ Terminada";
let unaEstrella = "⭐";
let dosEstrellas = "⭐⭐";
let tresEstrellas = "⭐⭐⭐";
function tarea(id, titulo, descripcion, dificultad, creacion, vencimiento, estado) {
    return {
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        creacion: creacion,
        vencimiento: vencimiento,
        dificultad: dificultad
    };
}
function tareaEspecifica() {
    console.log("Desea ver alguna en especifico?");
    console.log("Ingrese el numero de la tarea o [0] para volver.");
    identificador = Number(scc(''));
    if (identificador === 0) {
        return 0;
    }
    while ((identificador < 0) || (identificador > (tareas.length + 1))) {
        console.log("Ingrese una tarea valida.");
        pausa();
        console.clear();
        console.log("Sus tareas son:");
        for (i = 0; i < tareas.length; i++) {
            console.log(`[${i + 1}] ${tareas[i].titulo}`);
        }
        console.log("Desea ver alguna en especifico?");
        console.log("Ingrese el número de la tarea o [0] para volver.");
        identificador = Number(scc(''));
    }
    return identificador;
}
function tareaDetallada(identificador) {
    i = identificador;
    console.log("-----------------------------------");
    console.log(`📚 Título: ${tareas[i - 1].titulo}`);
    console.log(`📝 Descripción: ${tareas[i - 1].descripcion}`);
    console.log(`🔴 Estado: ${tareas[i - 1].estado}`);
    console.log(`📅 Creación: ${tareas[i - 1].creacion}`);
    console.log(`📅 Vencimiento: ${tareas[i - 1].vencimiento}`);
    console.log(`🧩 Dificultad: ${tareas[i - 1].dificultad}`);
    console.log("-----------------------------------");
    verificadorModificador();
    modificarTarea(opc2, identificador);
}
function modificarTarea(opc, identificador) {
    if (opc == 1) {
        console.log(`Usted esta editando la tarea:  ${tareas[identificador - 1].titulo}`);
        console.log("Si desea dejar un valor en blanco , escribe un '-' .");
        console.log("¿Qué desea modificar?");
        console.log("[1] Título.");
        console.log("[2] Descripción.");
        console.log("[3] Estado.");
        console.log("[4] Vencimiento.");
        console.log("[5] Dificultad.");
        console.log("[0] Salir.");
        opc1 = Number(scc(''));
        switch (opc1) {
            case 1:
                titulo = getTitulo();
                tareas[identificador - 1].titulo = titulo;
                console.log("Título modificado con éxito.");
                pausa();
                console.clear();
                break;
            case 2:
                descripcion = getDescripcion();
                tareas[identificador - 1].descripcion = descripcion;
                console.log("Descripción modificada con éxito.");
                pausa();
                console.clear();
                break;
            case 3:
                estado = getEstado();
                tareas[identificador - 1].estado = estado;
                console.log("Estado modificado con éxito.");
                pausa();
                console.clear();
                break;
            case 4:
                vencimiento = getVencimiento();
                tareas[identificador - 1].vencimiento = vencimiento;
                console.log("Vencimiento modificado con éxito.");
                pausa();
                console.clear();
                break;
            case 5:
                dificultad = getDificultad();
                dificultad = TraducirDificultad(dificultad);
                tareas[identificador - 1].dificultad = dificultad;
                console.log("Dificultad modificada con éxito.");
                pausa();
                console.clear();
                break;
        }
        seguirModificando();
    }
}
function seguirModificando() {
    console.log("-----------------------------------");
    console.log("¿Desea seguir modificando?");
    console.log("[1] Si.");
    console.log("[2] No.");
    opc = Number(scc(''));
    console.clear();
    while (opc < 1 || opc > 2) {
        console.log("Ingrese una opción valida.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Desea modificar otra tarea?");
        console.log("[1] Si.");
        console.log("[2] No.");
        opc = Number(scc(''));
    }
    if (opc == 1) {
        modificarTarea(opc, identificador);
    }
    else {
        console.clear();
    }
}
function mostrarTareas() {
    console.log("Sus tareas son:");
    for (i = 0; i < tareas.length; i++) {
        console.log(`[${i + 1}] ${tareas[i].titulo}`);
    }
    tareaEspecifica();
    if (identificador != 0) {
        tareaDetallada(identificador);
    }
}
function mostrarTareasPendientes() {
    let contador = 0;
    console.log("Tareas Pendientes: ");
    for (i = 0; i < tareas.length; i++) {
        if (tareas[i].estado == pendiente) {
            console.log(`[${i + 1}] ${tareas[i].titulo}`);
            console.log("");
            contador = contador + 1;
        }
    }
    return contador;
}
function mostrarTareasEnCurso() {
    let contador = 0;
    console.log("Tareas En Curso: ");
    for (i = 0; i < tareas.length; i++) {
        if (tareas[i].estado == enCurso) {
            console.log(`[${i + 1}] ${tareas[i].titulo}`);
            console.log("");
            contador = contador + 1;
        }
    }
    return contador;
}
function mostrarTareasTerminadas() {
    let contador = 0;
    console.log("Tareas Terminadas: ");
    for (i = 0; i < tareas.length; i++) {
        if (tareas[i].estado == terminada) {
            console.log(`[${i + 1}] ${tareas[i].titulo}`);
            console.log("");
            contador = contador + 1;
        }
    }
    return contador;
}
function verificadorModificador() {
    console.log("Si desea modificar la tarea presione [1], de lo contrario [0]");
    opc2 = Number(scc(''));
    console.clear();
    return opc2;
}
function getTitulo() {
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué titulo desea colocarle a su tarea?");
    console.log("-----------------------------------");
    titulo = scc('');
    while (titulo == " " || titulo == "") {
        console.log("El titulo no puede estar vacio.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué titulo desea colocarle a su tarea?");
        console.log("-----------------------------------");
        titulo = scc('');
    }
    return titulo;
}
function getDescripcion() {
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué descripción desea colocarle a su tarea?");
    console.log("-----------------------------------");
    descripcion = scc('');
    return descripcion;
}
function getEstado() {
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué estado desea colocarle a su tarea?");
    console.log("[T] Pendiente.");
    console.log("[C] En curso.");
    console.log("[T] Terminada.");
    console.log("-----------------------------------");
    estado = scc('');
    while ((estado < "1") || (estado > "3") || (estado == " ")) {
        console.log("Ingrese un estado valido.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué estado desea colocarle a su tarea?");
        console.log("[P] Pendiente.");
        console.log("[C] En curso.");
        console.log("[T] Terminada.");
        console.log("-----------------------------------");
    }
    if (estado === "P" || estado === "p") {
        estado = pendiente;
    }
    else if (estado === "C" || estado === "c") {
        estado = enCurso;
    }
    else if (estado === "T" || estado === "t") {
        estado = terminada;
    }
    return estado;
}
function getCreacion() {
    creacion = fecha;
    return creacion;
}
function getDia() {
    console.log("Ingrese el día");
    dia = Number(scc(''));
    console.clear();
    while (dia == undefined) {
        console.log("El día no puede estar vacio.");
        pausa();
        console.log("Ingrese el día");
        dia = Number(scc(''));
        console.clear();
    }
    return dia;
}
function controlarDia(dia) {
    while ((dia < 1) || (dia > 31)) {
        console.log("Ingrese un día valido.");
        pausa();
        console.clear();
        dia = getDia();
    }
    return dia;
}
function getMes() {
    console.log("Ingrese el mes");
    mes = Number(scc(''));
    console.clear();
    while (mes === undefined) {
        console.log("El mes no puede estar vacio.");
        pausa();
        console.clear();
        console.log("Ingrese el mes");
        mes = Number(scc(''));
        console.clear();
    }
    return mes;
}
function controlarMes(mes) {
    while ((mes < 1) || (mes > 12)) {
        console.log("Ingrese un mes valido.");
        pausa();
        console.clear();
        mes = getMes();
    }
    return mes;
}
function getAño() {
    console.log("Ingrese el año");
    anio = Number(scc(''));
    console.clear();
    while (anio === undefined) {
        console.log("El año no puede estar vacio.");
        pausa();
        console.clear();
        console.log("Ingrese el año");
        anio = Number(scc(''));
        console.clear();
    }
    return anio;
}
function controlarAnio(anio) {
    while ((anio < 2024)) {
        console.log("Ingrese un año valido.");
        pausa();
        console.clear();
        anio = getAño();
    }
    return anio;
}
function getVencimiento() {
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué fecha de vencimiento desea colocarle a su tarea?");
    console.log("(Recuerde que la fecha de vencimiento no puede ser anterior a la fecha de creación.)");
    console.log("-----------------------------------");
    pausa();
    console.clear();
    console.log("Desea cargar la fecha de vencimiento?");
    console.log("Presione [1] si desea cargar la fecha de vencimiento, de lo contrario presione [0].");
    let opc4 = Number(scc(''));
    console.clear();
    while (opc4 < 0 || opc4 > 1) {
        console.log("Ingrese una opción valida.");
        pausa();
        console.clear();
        console.log("Desea cargar la fecha de vencimiento?");
        console.log("Presione [1] si desea cargar la fecha de vencimiento, de lo contrario presione [0].");
        opc4 = Number(scc(''));
        console.clear();
    }
    if (opc4 == 1) {
        dia = getDia();
        dia = controlarDia(dia);
        mes = getMes();
        mes = controlarMes(mes);
        anio = getAño();
        anio = controlarAnio(anio);
        vencimiento = new Date(anio, mes - 1, dia);
        vencimiento = controlarFecha(vencimiento);
        return vencimiento;
    }
    else {
        vencimiento = "Sin Vencimiento. ";
        return vencimiento;
    }
}
function controlarFecha(vencimiento) {
    while (vencimiento < creacion) {
        console.log("-----------------------------------");
        console.log("La fecha de vencimiento no puede ser anterior a la fecha de creación.");
        console.log("-----------------------------------");
        pausa();
        console.clear();
        vencimiento = getVencimiento();
    }
    return vencimiento;
}
function getDificultad() {
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué dificultad desea colocarle?");
    console.log("[F] ⭐.");
    console.log("[M] ⭐⭐.");
    console.log("[D] ⭐⭐⭐.");
    console.log("-----------------------------------");
    dificultad = scc('');
    while (((dificultad === "F") || (dificultad === "f")) || ((dificultad === "M") || (dificultad === "m")) || ((dificultad === "D") || (dificultad === "d"))) {
        console.log("Ingrese una dificultad valida.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué dificultad desea colocarle?");
        console.log("[F] ⭐.");
        console.log("[M] ⭐⭐.");
        console.log("[D] ⭐⭐⭐.");
        console.log("-----------------------------------");
        dificultad = scc('');
    }
    console.clear();
    return dificultad;
}
function TraducirDificultad(dificultad) {
    if (((dificultad === "F") || (dificultad === "f"))) {
        return unaEstrella;
    }
    else if (((dificultad === "M") || (dificultad === "m"))) {
        return dosEstrellas;
    }
    else if (((dificultad === "D") || (dificultad === "d"))) {
        return tresEstrellas;
    }
}
function controlTareas() {
    console.log("¿Desea seguir cargando tareas?");
    console.log("[1] Si.");
    console.log("[2] No.");
    control = Number(scc(''));
    while ((control < 1) || (control > 2) || (control === undefined)) {
        console.log("Ingrese una opción valida.");
        pausa();
        console.clear();
        console.log("¿Desea seguir cargando tareas?");
        console.log("[1] Si.");
        console.log("[2] No.");
    }
    return control;
}
function buscarTarea() {
    let arrayTareasSimilares = [];
    contador = 0;
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué tarea desea buscar?");
    console.log("-----------------------------------");
    titulo = scc('');
    for (i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo.toLowerCase().includes(titulo.toLowerCase())) {
            arrayTareasSimilares.push(tareas[i]);
            contador = contador + 1;
        }
    }
    if (contador == 0) {
        console.log("No se encontraron tareas similares.");
    }
    else {
        // mostrarTareasSimilares(arrayTareasSimilares, contador);
    }
}
/*
function mostrarTareasSimilares(arrayTareasSimilares: Array<tareas>, contador:number){
    console.clear();
    console.log("-----------------------------------");
    console.log(`Se encontraron ${contador} tareas similares.`);
    for (i=0; i<arrayTareasSimilares.length; i++){
        console.log(`[${i+1}] ${arrayTareasSimilares[i].titulo}`);
    }
    console.log("-----------------------------------");
    pausa();
    console.clear();
}
*/
function pausa() {
    console.log("Presione enter para continuar...");
    scc('');
}
function menuPrincipal() {
    console.log("--------------------");
    console.log("Bienvenid@");
    console.log("¿Que desea hacer?");
    console.log("[1] Ver mis tareas.");
    console.log("[2] Buscar una tarea.");
    console.log("[3] Agregar una tarea.");
    console.log("[0] Salir.");
    console.log("--------------------");
    opc = Number(scc(''));
    return opc;
}
function menuTareas() {
    console.log("--------------------");
    console.log("Que tareas deseas ver");
    console.log("[1] Todas.");
    console.log("[2] Pendientes.");
    console.log("[3] En curso.");
    console.log("[4] Terminadas.");
    console.log("[0] Salir.");
    console.log("--------------------");
    opc1 = Number(scc(''));
    console.clear();
    return opc1;
}
do {
    opc3 = menuPrincipal();
    switch (opc3) {
        case 1:
            if (control1 == 1) {
                do {
                    menuTareas();
                    switch (opc1) {
                        case 1:
                            console.clear();
                            mostrarTareas();
                            pausa();
                            console.clear();
                            break;
                        case 2:
                            console.clear();
                            mostrarTareasPendientes();
                            if ((contador > 0) && (contador <= (tareas.length + 1)) && contador !== undefined) {
                                tareaEspecifica();
                                if (identificador != 0) {
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0) {
                                console.log("No hay tareas pendientes.");
                            }
                            pausa();
                            console.clear();
                            break;
                        case 3:
                            console.clear();
                            mostrarTareasEnCurso();
                            if ((contador > 0) && (contador <= (tareas.length + 1))) {
                                tareaEspecifica();
                                if (identificador != 0) {
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0) {
                                console.log("No hay tareas en curso.");
                            }
                            pausa();
                            console.clear();
                            break;
                        case 4:
                            console.clear();
                            mostrarTareasTerminadas();
                            if ((contador > 0) && (contador <= (tareas.length + 1))) {
                                tareaEspecifica();
                                if (identificador != 0) {
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0) {
                                console.log("No hay tareas terminadas.");
                            }
                            pausa();
                            console.clear();
                            break;
                        case 0:
                            console.clear();
                            break;
                        default:
                            console.log("Ingrese una opción valida.");
                            break;
                    }
                } while (opc1 != 0);
            }
            else {
                console.log("Usted no tiene tareas ingresadas. Ingrese una y vuelva.");
                pausa();
                console.clear();
            }
            break;
        case 2:
            buscarTarea();
            break;
        case 3:
            control1 = 1;
            bandera = 1;
            while (bandera == 1) {
                id = tareas.length + 1;
                titulo = getTitulo();
                descripcion = getDescripcion();
                estado = pendiente;
                creacion = getCreacion();
                vencimiento = getVencimiento();
                dificultad = getDificultad();
                dificultad = TraducirDificultad(dificultad);
                tareas.push(tarea(id, titulo, descripcion, dificultad, creacion, vencimiento, estado));
                control = controlTareas();
                console.clear();
                if (control == 1) {
                    bandera = 1;
                }
                else {
                    bandera = 0;
                }
            }
            break;
        case 0:
            console.log("Gracias por usar el sistema.");
            break;
        default:
            console.log("Ingrese una opción valida.");
            break;
    }
} while (opc != 0);
