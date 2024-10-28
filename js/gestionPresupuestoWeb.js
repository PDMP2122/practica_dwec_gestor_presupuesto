


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
        gastoEtiquetas.append(span);
    }
   
    divGasto.append(gastoDescripcion);
    divGasto.append(gastoFecha);
    divGasto.append(gastoValor); 
    divGasto.append(gastoEtiquetas);
    elemento.append(divGasto);
}

/*
Función ~mostrarGastosAgrupadosWeb~
     Función de *tres parámetros* que se encargará de crear dentro del elemento HTML con ~id~ ~idElemento~ indicado una *estructura HTML* para el objeto ~agrup~ que se pase como parámetro:
     - ~idElemento~ - Hará referencia al ~id~ del elemento HTML donde se insertará el conjunto de estructuras HTML que se creará para cada gasto.
     - ~agrup~ - Objeto que contendrá el resultado de *agrupar el total de gastos por período temporal* (ejecución de la función ~agruparGastos~ desarrollada en la práctica anterior). Recordemos un ejemplo del formato que puede tener ~agrup~ en el caso de agrupar por mes:
       #+begin_src js
         agrup = {
             "2021-09": 5,
             "2021-10": 39
         }
       #+end_src
     - ~periodo~ - Período temporal por el que se habrá realizado la agrupación. Recordemos que puede ser ~mes~, ~dia~ o ~anyo~.
         
     Para cada objeto ~agrup~ se creará una *estructura* como la siguiente:
     #+begin_src html
       <div class="agrupacion">
         <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
              de la función es "mes", "dia" o "anyo" respectivamente -->
         <h1>Gastos agrupados por PERIODO</h1>
       
         <!-- Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:
              https://es.javascript.info/keys-values-entries#object-keys-values-entries -->
         <div class="agrupacion-dato">
           <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
           <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
         </div>
       
         <div class="agrupacion-dato">
           <span class="agrupacion-dato-clave">NOMBRE_PROPIEDAD_OBJETO_AGRUP</span>
           <span class="agrupacion-dato-valor">VALOR_PROPIEDAD_OBJETO_AGRUP</span>
         </div>
       
         <!-- Etcétera -->
       
       </div>
     #+end_src

     Así, para el ejemplo de ~agrup~ dado antes se deberá generar un código como el siguiente:
     #+begin_src html
       <div class="agrupacion">
         <h1>Gastos agrupados por mes</h1>
         <div class="agrupacion-dato">
           <span class="agrupacion-dato-clave">2021-09</span>
           <span class="agrupacion-dato-valor">5</span>
         </div>
       
         <div class="agrupacion-dato">
           <span class="agrupacion-dato-clave">2021-10</span>
           <span class="agrupacion-dato-valor">39</span>
         </div>
       </div>
     #+end_src
*/
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
           <span class="agrupacion-dato-valor">${value}</span>`;
    divAgrupacion.append(divAgrupacionDato);
});



  elemento.append(divAgrupacion);


}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}