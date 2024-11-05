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


/*
**** Función ~nuevoGastoWeb~ y botón ~anyadirgasto~
     Esta función se utilizará como [[https://es.javascript.info/introduction-browser-events#addeventlistener][manejadora de eventos]] del botón ~anyadirgasto~ del
      código HTML. Realizará las siguientes tareas:
     - Pedir al usuario *la información necesaria para crear un nuevo gasto* mediante sucesivas preguntas con [[https://es.javascript.info/alert-prompt-confirm][prompt]] 
     (por orden: descripción, valor, fecha y etiquetas). Por simplicidad, de momento *no se comprobará la validez de dichos datos*. La fecha vendrá dada en
      formato internacional (~yyyy-mm-dd~) y las *etiquetas* se introducirán en un único cuadro de texto como una *lista separada por comas* (
        por ejemplo, ~etiqueta1,etiqueta2,etiqueta3~).
     - Convertir el valor a número (recuerda que ~prompt~ siempre devuelve un ~string~).
     - Convertir la cadena de texto de etiquetas devuelta por ~prompt~ [[https://es.javascript.info/array-methods#split-y-join][a un array]].
     - Crear un nuevo gasto (función ~crearGasto~). *¡Ojo con la manera de pasar el parámetro ~etiquetas~!*
     - Añadir el gasto a la lista (función ~anyadirGasto~).
     - Llamar a la función ~repintar~ para que se muestre la lista con el nuevo gasto.
*/


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

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}