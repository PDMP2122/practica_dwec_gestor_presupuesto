


function mostrarDatoEnId(idElemento, valor){
   return document.querySelector(idElemento).innerText = valor; 
}

/*
Función de *dos parámetros* que se encargará de *añadir dentro del elemento HTML* con ~id~ ~idElemento~ indicado una *estructura HTML* para el ~gasto~ 
que se pase como parámetro:
     - ~idElemento~ - Hará referencia al ~id~ del elemento HTML donde se insertará el conjunto de estructuras HTML que se crearán para cada gasto.
     - ~gasto~ - Objeto gasto

      Así, para un determinado ~gasto~ se creará una *estructura* como la siguiente:
     #+begin_src html
       <div class="gasto">
         <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
         <div class="gasto-fecha">FECHA DEL GASTO</div> 
         <div class="gasto-valor">VALOR DEL GASTO</div> 
         <div class="gasto-etiquetas">
           <span class="gasto-etiquetas-etiqueta">
             ETIQUETA 1
           </span>
           <span class="gasto-etiquetas-etiqueta">
             ETIQUETA 2
           </span>
           <!-- Etcétera -->
         </div> 
       </div>
     #+end_src
*/

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.querySelector(idElemento);
    let divGasto = document.createElement("div");
   
    divGasto.classList.add("gasto");
 
    
    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.innerText = gasto.descripcion;
 
    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.innerText = gasto.fecha;

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


function mostrarGastosAgrupadosWeb(){}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}