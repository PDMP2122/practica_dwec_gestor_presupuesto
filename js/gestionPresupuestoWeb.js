import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor){
   return document.querySelector(idElemento).innerText = valor; 
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.querySelector(idElemento);
    let divGasto = document.createElement("div");
   
    divGasto.classList.add("gasto");
    
    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.innerText = gasto.descripcion;
 
    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.innerText = new Date(gasto.fecha).toLocaleDateString();

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.innerText = gasto.valor.toFixed(2);

    let gastoEtiquetas = document.createElement("div");
    
    gastoEtiquetas.classList.add("gasto-etiquetas");
   
    for (let etiqueta of gasto.etiquetas){
        let span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.innerText = etiqueta;
        gastoEtiquetas.append(span);
    }
   
    divGasto.append(gastoDescripcion);
    divGasto.append(gastoFecha);
    divGasto.append(gastoValor); 
    divGasto.append(gastoEtiquetas);
    elemento.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agroup, periodo){
  let elemento = document.querySelector(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  let h1 = document.createElement("h1");
  h1.innerText = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(h1);


  Object.entries(agroup).forEach(([key, value]) => {
    let divAgrupacionDato = document.createElement("div");
      divAgrupacionDato.classList.add("agrupacion-dato");
      divAgrupacionDato.innerHTML=`<span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${Number(value).toFixed(2)}</span>`;
      divAgrupacion.append(divAgrupacionDato);
  });

  elemento.append(divAgrupacion);

}


/*
Por tanto, es necesario disponer de una función que *vuelva a crear toda la estructura HTML* que refleje los cambios realizados en el modelo de datos. Esta función se denominará ~repintar~, y realizará las siguientes tareas:
     - Mostrar el presupuesto en ~div#presupuesto~ (funciones ~mostrarPresupuesto~ y ~mostrarDatoEnId~)
     - Mostrar los gastos totales en ~div#gastos-totales~ (funciones ~calcularTotalGastos~ y ~mostrarDatoEnId~)
     - Mostrar el balance total en ~div#balance-total~ (funciones ~calcularBalance~ y ~mostrarDatoEnId~)
     - *Borrar el contenido* de ~div#listado-gastos-completo~, para que el paso siguiente no duplique la información. Puedes utilizar ~innerHTML~ para borrar el contenido de dicha capa.
     - Mostrar el listado completo de gastos en ~div#listado-gastos-completo~ (funciones ~listarGastos~ y ~mostrarGastoWeb~)
     
     La función ~repintar~ *no actualizará el resto de capas* (filtrados y agrupaciones) de la práctica anterior (lo haremos así por simplicidad).
*/

function repintar(){

  mostrarDatoEnId("div#presupuesto", gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId("div#gastos-totales", gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId("div#balance-total", gestionPresupuesto.calcularBalance());
  document.querySelector("div#listado-gastos-completo").innerHTML="";
  mostrarGastoWeb("div#listado-gastos-completo", gestionPresupuesto.listarGastos());

}


function actualizarPresupuestoWeb (){
  let presupuestoNuevo = Number(prompt("Introduce nuevo presupuesto"));
  gestionPresupuesto.actualizarPresupuesto(presupuestoNuevo);
  repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}