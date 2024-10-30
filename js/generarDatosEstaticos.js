import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId("div#presupuesto", gestionPresupuesto.mostrarPresupuesto());

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId("div#gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("div#balance-total", gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.listarGastos();

for (let gasto of gastos){
    gestionPresupuestoWeb.mostrarGastoWeb("div#listado-gastos-completo", gasto);
}


let gastosFiltrados1 = gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta: "2021-09-30"})

for (let gasto of gastosFiltrados1){
gestionPresupuestoWeb.mostrarGastoWeb("div#listado-gastos-filtrado-1", gasto);
}

let gastosFiltrados2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50})

for (let gasto of gastosFiltrados2){
gestionPresupuestoWeb.mostrarGastoWeb("div#listado-gastos-filtrado-2", gasto);
}

let gastosFiltrados3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]})

for (let gasto of gastosFiltrados3){
gestionPresupuestoWeb.mostrarGastoWeb("div#listado-gastos-filtrado-3", gasto);
}

let gastosFiltrados4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida", "transporte"]})

for (let gasto of gastosFiltrados4){
gestionPresupuestoWeb.mostrarGastoWeb("div#listado-gastos-filtrado-4", gasto);
}


gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("div#agrupacion-dia", gestionPresupuesto.agruparGastos("dia"),"día")

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("div#agrupacion-mes", gestionPresupuesto.agruparGastos("mes"),"mes")

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("div#agrupacion-anyo", gestionPresupuesto.agruparGastos("año"),"año")