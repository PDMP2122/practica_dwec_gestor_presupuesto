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
    gastoValor.innerText = gasto.valor;

    let gastoEtiquetas = document.createElement("div");
    
    gastoEtiquetas.classList.add("gasto-etiquetas");
   
    for (let etiqueta of gasto.etiquetas){
        let span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.innerText = etiqueta;
        
        /*Añado evento a la etiqueta span */

        //creo el manejador
        let manejadorBorradoEtiqueta = Object.create(BorrarEtiquetasHandle);
        //Asocio gasto y etiqueta al manejador
        manejadorBorradoEtiqueta.gasto = gasto;
        manejadorBorradoEtiqueta.etiqueta = etiqueta;
        //Añado evento al span con el manejador
        span.addEventListener("click", manejadorBorradoEtiqueta);

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
   
    //Manejador de eventos boton editar
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
   
    //Manejador de eventos boton borrar
    let borrarManejador = Object.create(BorrarHandle);
    //Asocio borrarManejador a gasto
    borrarManejador.gasto = gasto;
    //Se añade manejador al botón
    botonBorrar.addEventListener("click", borrarManejador)
    //Se añade el boton
    divGasto.append(botonBorrar);

    /*Boton borrar gasto API */

    let botonBorrarAPI = document.createElement("button");
    botonBorrarAPI.setAttribute("type", "button")
    botonBorrarAPI.classList.add("gasto-borrar-api");
    botonBorrarAPI.textContent="Borrar (API)";

    //Manejador de eventos boton borrar API
    let borrarManejadorAPI = Object.create(BorrarHandleAPI);
    //Asocio borrarManejador a gasto
    borrarManejadorAPI.gasto = gasto;
    //Se añade manejador al botón
    botonBorrarAPI.addEventListener("click", borrarManejadorAPI)
    //Se añade el boton
    divGasto.append(botonBorrarAPI);


    //Boton Editar formulario

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.setAttribute("type", "button");
    botonEditarFormulario.classList.add("gasto-editar-formulario");
    botonEditarFormulario.textContent="Editar (formulario)";

    //Manejador de eventos boton editar formulario
    let manejadorEditarFormulario = Object.create(EditarHandleFormulario);
    //Asocio manejadorEditarFormulario a gasto y a la etiqueta divGasto
    manejadorEditarFormulario.gasto = gasto;
    manejadorEditarFormulario.divGasto = divGasto;
    manejadorEditarFormulario.botonEditarFormulario = botonEditarFormulario;
    //Se añade manejador al botón
    botonEditarFormulario.addEventListener("click", manejadorEditarFormulario)
    //Se añade el boton
    divGasto.append(botonEditarFormulario);

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


/*Funciones manejadoras eventos botones y etiquetas*/

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

let BorrarEtiquetasHandle = {
  handleEvent: function(evento){
    this.gasto.borrarEtiquetas(this.etiqueta)
    repintar();
  }
}


/*Creacion y edicion Gastos con Formulario */

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);


function nuevoGastoWebFormulario(evento){

  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");

  let divControlesPrincipales = document.getElementById("controlesprincipales");
  
  divControlesPrincipales.append(formulario);
  
  botonAnyadirGastoFormulario.disabled = true;

  formulario.addEventListener("submit", submitFormulario);
  
 function crearGastoFormulario(){
  let descripcion = formulario.descripcion.value;
  let valor = Number(formulario.valor.value);
  let fecha = Date.parse(formulario.fecha.value);
  let etiquetas = (formulario.etiquetas.value).split(",");
  
  let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);

  return nuevoGasto
 }
 
 
  function submitFormulario(evento){
    evento.preventDefault();
    gestionPresupuesto.anyadirGasto(crearGastoFormulario());
    repintar();
    formulario.remove()
    botonAnyadirGastoFormulario.disabled = false;
  }

  async function nuevoGastoAPI(){
    evento.preventDefault();

    let nombreUsuario = document.getElementById("nombre_usuario").value;
    
    if(nombreUsuario){

      let respuesta = await fetch (
        "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario + "/",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(crearGastoFormulario())
        });
    
        (respuesta.ok)?(alert("Gasto añadido con exito"), cargarGastosApi()):(alert("Error de red"));
    }else{

      alert("Introduce nombre de usuario");
    }

    formulario.remove()
    botonAnyadirGastoFormulario.disabled = false;
    
  }

  let botonEnviarAPI = document.querySelector(".gasto-enviar-api");
  botonEnviarAPI.addEventListener("click", nuevoGastoAPI)



  let botonCancelar = document.querySelector(".cancelar");
  
  let cancelarManejador = Object.create(cancelarBoton);
  //Envio del elemento formulario para su destrucción
  cancelarManejador.formulario = formulario;
  botonCancelar.addEventListener("click", cancelarManejador);
}

let cancelarBoton = {
  handleEvent: function cancelarFormulario(evento){
    this.formulario.remove();

    //Al utilizarse en Cancelar para el form de añadir y editar, 
    //comprueba la existencia de la propiedad editar y botonAnyadirGastoFormulario según se envíe.

    if (this.botonEditar)
      this.botonEditar.disabled = false;
    else{
      botonAnyadirGastoFormulario.disabled = false;
    }
  }
}

/*Editar formulario*/

let EditarHandleFormulario ={
  handleEvent: function editarFormulario(evento){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formularioEdit = plantillaFormulario.querySelector("form");
  
    this.divGasto.append(formularioEdit);
    
    this.botonEditarFormulario.disabled = true;

    formularioEdit.descripcion.value = this.gasto.descripcion;
    formularioEdit.valor.value = this.gasto.valor;
    formularioEdit.fecha.value = new Date (this.gasto.fecha).toISOString().split('T')[0];
    formularioEdit.etiquetas.value = this.gasto.etiquetas.join(',')
  
    function actualizarValoresConFormulario(gasto){
      let descripcion = formularioEdit.descripcion.value;
      let valor = Number(formularioEdit.valor.value);
      let fecha = Date.parse(formularioEdit.fecha.value);
      let etiquetas = (formularioEdit.etiquetas.value).split(",");
      gasto.actualizarDescripcion(descripcion);
      gasto.actualizarValor(valor);
      gasto.actualizarFecha(fecha);
      gasto.anyadirEtiquetas(...etiquetas);
    }
    
    let submitFormularioEdit ={
      handleEvent: function submitFormEdit(evento){
        evento.preventDefault();

        actualizarValoresConFormulario(this.gasto);
        formularioEdit.remove(); 
        this.botonEditarFormulario.disabled = false;
        repintar();
        }
    }

    let manejadorForm= Object.create(submitFormularioEdit);
    manejadorForm.gasto = this.gasto;
    manejadorForm.botonEditarFormulario = this.botonEditarFormulario;
    
    formularioEdit.addEventListener("submit", manejadorForm);

    /*Enviar API */

    let enviarAPIHandle ={
      handleEvent: async function enviarAPIHandle(evento){
        evento.preventDefault();
        console.log(this.gasto.valor);

        actualizarValoresConFormulario(this.gasto);

        let nombreUsuario = document.getElementById("nombre_usuario").value;
        
        if(nombreUsuario){

          let respuesta = await fetch (
            "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario + "/" + this.gasto.gastoId,
            {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.gasto)
            });
        
            (respuesta.ok)?(alert("Gasto modificado con exito"), cargarGastosApi()):(alert("Error de red"));
        }else{

          alert("Introduce nombre de usuario");
        }
      }
    }

    let botonEnviarAPI = document.querySelector(".gasto-enviar-api");
    let enviarAPIManejador = Object.create(enviarAPIHandle);
    enviarAPIManejador.gasto = this.gasto;
    botonEnviarAPI.addEventListener("click", enviarAPIManejador)

    /*Botón cancelar*/

    let botonCancelar = document.querySelector(".cancelar");
    let cancelarManejador = Object.create(cancelarBoton);
    
    //Envio del elemento formulario para su destrucción
    cancelarManejador.formulario = formularioEdit;
    cancelarManejador.botonEditar = manejadorForm.botonEditarFormulario;
    botonCancelar.addEventListener("click", cancelarManejador);
  }
}

/*Logica formulario filtrado de gastos*/

let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit",filtrarGastosWeb)

function filtrarGastosWeb(evento){
  evento.preventDefault();
  let descripcionFilt = formularioFiltrado["formulario-filtrado-descripcion"].value;
  let valorMinimoFilt = formularioFiltrado["formulario-filtrado-valor-minimo"].value;
  console.log(valorMinimoFilt);
  let valorMaximoFilt = formularioFiltrado["formulario-filtrado-valor-maximo"].value;
  let fechaInicialFilt = formularioFiltrado["formulario-filtrado-fecha-desde"].value;
  console.log(fechaInicialFilt);
  let fechaFinalFilt = formularioFiltrado["formulario-filtrado-fecha-hasta"].value;

  let etiquetasFilt = formularioFiltrado["formulario-filtrado-etiquetas-tiene"].value;

  (etiquetasFilt.length > 0)?(etiquetasFilt = gestionPresupuesto.transformarListadoEtiquetas(etiquetasFilt)):(null);

  console.log(etiquetasFilt);
  let obj = {}
  
  obj.descripcionContiene = descripcionFilt;
  obj.valorMinimo = valorMinimoFilt;
  obj.valorMaximo = valorMaximoFilt;
  obj.fechaDesde = fechaInicialFilt;
  obj.fechaHasta = fechaFinalFilt;
  obj.etiquetasTiene = etiquetasFilt;

  let gastosFiltrados = gestionPresupuesto.filtrarGastos(obj);

  if (descripcionFilt === "" && valorMinimoFilt === "" && valorMaximoFilt === ""  && fechaInicialFilt === ""  && fechaFinalFilt === "" && etiquetasFilt === "" ){
    gastosFiltrados = gestionPresupuesto.listarGastos();
  }

  document.querySelector("div#listado-gastos-completo").innerHTML="";

  for (let gasto of gastosFiltrados){
    mostrarGastoWeb("div#listado-gastos-completo", gasto);
  }

}

/* Carga y guardado en Almacenamiento Local */

let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", guardarGastosWeb);

function guardarGastosWeb(){

  let gastos = gestionPresupuesto.listarGastos();
  localStorage.clear();
  localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastos));
 
}

let botonCargar = document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", cargarGastosWeb);

function cargarGastosWeb(){
  
  let gastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
  gastos?(gestionPresupuesto.cargarGastos(gastos)):(gestionPresupuesto.cargarGastos([]))
  repintar();  
}


/*Datos carga prueba */

let gasto1 = new gestionPresupuesto.CrearGasto("Gasto 1", 32.43, "2024-12-17", "prueba1", "energia", "casa");
let gasto2 = new gestionPresupuesto.CrearGasto("Gasto 2", 55.27, "2024-10-19", "prueba2", "gasolina", "coche");
let gasto3 = new gestionPresupuesto.CrearGasto("Gasto 3", 105.27, "2024-12-18", "prueba3", "Comida", "supermercado");

async function cargarGastosPruebaAPI(gasto){
   
  let respuesta = await fetch (
    "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/pablodemadaria",
    {
      method: "POST",
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(gasto)
    });

    if (respuesta.ok){

      console.log("gasto enviado con exito");
    }

};

//cargarGastosPruebaAPI(gasto1);
//cargarGastosPruebaAPI(gasto2);
//cargarGastosPruebaAPI(gasto3);



/*Carga y guardado API */

let botonCargarGastosAPI = document.getElementById("cargar-gastos-api");
botonCargarGastosAPI.addEventListener("click", cargarGastosApi)

async function cargarGastosApi(){
  let nombreUsuario = document.getElementById("nombre_usuario").value;
  
  if(nombreUsuario){

    let url="https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario;

    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    
    (respuesta.ok)?(gestionPresupuesto.cargarGastos(datos), repintar()):(alert("Error de red"));

  }else{

    alert("Introduce nombre de usuario");
  }
}

/* Borrado en formulario */

let BorrarHandleAPI = {
  handleEvent: async function BorrarHandleAPI(evento){
    evento.preventDefault();
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    
    if(nombreUsuario){

      let respuesta = await fetch (
        "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario + "/" + this.gasto.gastoId,
        {
          method: "DELETE"
        });
    
        (respuesta.ok)?(console.log("Gasto borrado con exito"), cargarGastosApi()):(alert("Error de red"));

    }else{

      alert("Introduce nombre de usuario");
    }
  }
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi
}