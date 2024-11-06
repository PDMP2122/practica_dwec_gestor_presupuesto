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


    divGasto.append(botonEditar);





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


/*
**** Función ~EditarHandle~
     Esta función se utilizará como [[https://es.javascript.info/introduction-browser-events#objetos-handlers-handleevent][objeto manejador de eventos]] para editar un gasto.

     La razón de utilizar esta función es la siguiente: queremos añadir un botón para *editar* cada gasto de la lista. Por tanto, necesitamos que haya una *conexión* entre 
     dicho botón y el gasto asociado a él. Recordemos que si tenemos 4 gastos, tendremos 4 botones de Editar.

     Hay muchas soluciones para realizar esta asociación: una podría ser añadir un ~id~ al botón ~Editar~ de dicho gasto que sea el mismo que el ~id~ del gasto asociado.
      Así, si se hace clic en dicho botón, inspeccionando su atributo ~id~ podremos saber el gasto al que hace referencia. No obstante, esta solución no es demasiado buena:
       la lógica de negocio de nuestra aplicación solo almacena el array de gastos, por lo que tendríamos que añadir una función para buscar dicho gasto dado su ~id~.

     En lugar de ello optaremos por una solución un poco más elaborada aprovechando que ~addEventListener~ nos permite
      [[https://es.javascript.info/introduction-browser-events#objetos-handlers-handleevent][utilizar un objeto]] como manejador de eventos.

     La función ~EditarHandle~ será una [[https://es.javascript.info/constructor-new#funcion-constructora][función constructora]] que definirá exclusivamente un 
     método llamado ~handleEvent~. Cuando creemos un objeto basado en su prototipo, asignaremos a dicho objeto una propiedad llamada ~gasto~, que será una referencia 
     al gasto que estemos editando. El código de la función ~handleEvent~ podrá hacer referencia a dicho gasto a través de ~this.gasto~, ya que es una propiedad del 
     objeto. Esta función realizará las siguientes tareas:
     - Pedir al usuario *la información necesaria para editar el gasto* mediante sucesivas preguntas con [[https://es.javascript.info/alert-prompt-confirm][prompt]]. 
     Por simplicidad, de momento *no se comprobará la validez de dichos datos*. La fecha vendrá dada en formato internacional (~yyyy-mm-dd~) y las *etiquetas* se 
     introducirán en un único cuadro de texto como una *lista separada por comas* (por ejemplo, ~etiqueta1,etiqueta2,etiqueta3~). Recuerda que ~prompt~ admite como 
     segundo parámetro el valor por defecto del cuadro de diálogo, por lo que puedes proporcionar el valor actual de cada propiedad del gasto.
     - Convertir el valor a número (recuerda que ~prompt~ siempre devuelve un ~string~).
     - Convertir la cadena de texto de etiquetas devuelta por ~prompt~ [[https://es.javascript.info/array-methods#split-y-join][a un array]].
     - Actualizar las propiedades del gasto (disponible mediante ~this.gasto~), mediante las funciones ~actualizarValor~, ~actualizarDescripcion~, ~actualizarFecha~ y 
     ~anyadirEtiquetas~.
     - Llamar a la función ~repintar~ para que se muestre la lista de gastos con los datos actualizados de la edición.
     

*/


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



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}