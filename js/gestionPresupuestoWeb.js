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
    /*elemento.append(divgasto al final del código) */

    /*Botones de cada gasto: */

    /*Boton editar gasto */
    
    let botonEditar = document.createElement("button");
    botonEditar.setAttribute("type", "button")
    botonEditar.classList.add("gasto-editar");
    botonEditar.textContent="Editar";
   
    //Manejador de enventos boton editar
    let editarManejador = Object.create(EditarHandle);
    //Asocio editarManejador a gasto
    editarManejador.gasto = gasto;
    //Se añade manejador al botón
    botonEditar.addEventListener("click", editarManejador)
    //Se añade el boton
    divGasto.append(botonEditar);

    /*Boton borrar gasto */
    
    let botonBorrar = document.createElement("button");
    botonBorrar.setAttribute("type", "button")
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.textContent="Borrar";
   
    //Manejador de enventos boton borrar
    let borrarManejador = Object.create(BorrarHandle);
    //Asocio borrarManejador a gasto
    borrarManejador.gasto = gasto;
    //Se añade manejador al botón
    botonBorrar.addEventListener("click", borrarManejador)
    //Se añade el boton
    divGasto.append(botonBorrar);


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


function repintar(){

  mostrarDatoEnId("div#presupuesto", gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId("div#gastos-totales", gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId("div#balance-total", gestionPresupuesto.calcularBalance());
  document.querySelector("div#listado-gastos-completo").innerHTML="";
  for (let gasto of gestionPresupuesto.listarGastos()){
    mostrarGastoWeb("div#listado-gastos-completo", gasto)
  }
 
}


function actualizarPresupuestoWeb (){
  let presupuestoNuevo = Number(prompt("Introduce nuevo presupuesto", "0"));
  gestionPresupuesto.actualizarPresupuesto(presupuestoNuevo);
  repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb(){
  let descripcion = prompt("Introduce descripción", "DESCRIPCION");
  let valor = Number(prompt("Introduce valor"));
  let fecha = prompt("Introduce fecha");
  let etiquetas = prompt("Introduce etiquetas").split(",");
  let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
  gestionPresupuesto.anyadirGasto(nuevoGasto);
  repintar();
}

let botonNuevoGasto = document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);



/*Funciones manejadoras eventos botones */

let EditarHandle = {
  handleEvent: function(evento){

    let descripcion = prompt("Introduce descripción", this.gasto.descripcion);
    let valor = Number(prompt("Introduce valor", this.gasto.valor));
    let fecha = prompt("Introduce fecha", new Date(this.gasto.fecha).toISOString());
    let etiquetas = prompt("Introduce etiquetas").split(",");
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
  }
}

let BorrarHandle = {
  handleEvent: function(evento){

    gestionPresupuesto.borrarGasto(this.gasto.id);
    repintar();
  }
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}