// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    return (nuevoPresupuesto >= 0)?(presupuesto = nuevoPresupuesto, nuevoPresupuesto):(console.log("Error, numero negativo"), -1);
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    (valor>0 && !valor.isNaN)?(this.valor = valor):(this.valor = 0);
    (!isNaN(Date.parse(fecha)))?(this.fecha = Date.parse(fecha)):(this.fecha = Date.now());
    
    this.etiquetas=[];

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for (let etiqueta of nuevasEtiquetas){
            (!this.etiquetas.includes(etiqueta))?(this.etiquetas.push(etiqueta)):(null);
        }
    }

    this.anyadirEtiquetas(...etiquetas);

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        (nuevoValor>0 && !nuevoValor.isNaN)?(this.valor = nuevoValor):(null);
    }

    this.mostrarGastoCompleto = function(){
        const date = new Date(this.fecha).toLocaleString();
        let gastoCompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${date}\n`

        if(etiquetas){
            gastoCompleto += "Etiquetas:\n"
            for(let etiqueta of etiquetas){
                 gastoCompleto+=`- ${etiqueta}\n`;
            }
        }
        return gastoCompleto;
    }

    this.actualizarFecha = function(nuevaFecha){
      return (!isNaN(Date.parse(nuevaFecha)))?(this.fecha = Date.parse(nuevaFecha)):(null);
    }

    this.borrarEtiquetas = function(...etiquetasBorrar){
        for (let etiqueta of etiquetasBorrar){
            let indice = this.etiquetas.indexOf(etiqueta);
            (indice >-1)?(this.etiquetas.splice(this.etiquetas.indexOf(etiqueta), 1)):(null);
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        
        let dia =  new Date(this.fecha).getDate().toString().padStart(2, '0');
        let mes = (new Date(this.fecha).getMonth()+1).toString().padStart(2, '0');
        let anyo = new Date(this.fecha).getFullYear();
        
        switch(periodo){
            case "dia":
                return `${anyo}-${mes}-${dia}`;
            case "mes":
                return `${anyo}-${mes}`;
            default:    
                return `${anyo}`;
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
 
function borrarGasto(id){
    let index = -1;
    index = gastos.findIndex(gasto => gasto.id == id);
    (index>=0)?(gastos.splice(index, 1)):(null);
 }

function calcularTotalGastos(){
    let suma = 0;
    for (let gasto of gastos){
        suma+=gasto.valor;
    }
    return suma;
}

function calcularBalance(){
    return (presupuesto - calcularTotalGastos()).toFixed(2);
}

function filtrarGastos(obj){ 
    return gastos.filter(function(gasto){

        if(Object.keys(obj).length === 0)
            return gastos

        let cumple = true;

        if (obj.fechaDesde && cumple)
            (Date.parse (obj.fechaDesde) <= gasto.fecha)?(null):(cumple = false);
        
        if(obj.fechaHasta && cumple)
            (Date.parse(obj.fechaHasta) >= gasto.fecha)?(null):(cumple = false);

        if(obj.valorMinimo && cumple)
            (obj.valorMinimo <= gasto.valor)?(null):(cumple = false);

        if(obj.valorMaximo && cumple )
            (obj.valorMaximo >= gasto.valor)?(null):(cumple = false);

        if(obj.descripcionContiene && cumple)
            (gasto.descripcion.includes(obj.descripcionContiene))?(null):(cumple = false);

        if (obj.etiquetasTiene && cumple){

            cumple = false;

            for (let etiqueta of obj.etiquetasTiene){
                for (let etiquetaGasto of gasto.etiquetas){
                    (etiqueta == etiquetaGasto)?(cumple=true):(null)
                }
            }
        }

        return cumple;
    })   
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){

    let obj = {fechaDesde: fechaDesde, fechaHasta: fechaHasta, etiquetasTiene: etiquetas }
    let datosFiltrados = filtrarGastos(obj);

    return datosFiltrados.reduce(function(acc, gasto){

        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[periodoGasto] = acc[periodoGasto] || 0;
        acc[periodoGasto] += gasto.valor;
        
        return acc;
    }, {});

}

function transformarListadoEtiquetas(stringEtiquetas){
    
    let regex = /[a-zA-Z0-9]+/g;

    return stringEtiquetas.match(regex);
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos, 
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
