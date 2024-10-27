


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


function mostrarGastosAgrupadosWeb(){}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}