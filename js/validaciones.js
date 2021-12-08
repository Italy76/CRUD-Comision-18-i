export function campoRequerido(input){
    if(input.value.trim().length > 0){
     //   console.log("paso la validacion");
        input.className = "form-control is-valid";
        return true;
    }else{
       //  console.log("no paso la validacion");
         input.className = "form-control is-invalid";
         return false;
    }
}

export function validarNumeros(input){
    // crear una expresion regular (es como un patron)
    let patron = /^[0-9]{1,3}$/;
    // probar el funionamiento del patron o expresion regular
    if(patron.test(input.value)){
        // cumple la expresion regular
         input.className = "form-control is-valid";
         return true;   // introducios variables booleanas en las funciones para poder insertarlas dentro del if de validacionGeneral.
    }else{
        // si no cumple a expresion regular
        input.className = "form-control is-invalid";
        return false;
    }
}

export function validarURL(input){
    // crear la expresion regular
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(patron.test(input.value)){
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }
}

 export function validarGeneral(campoCodigo, campoProducto,campoDescripcion, campoCantidad, campoURL){ // Ahora inserto los parametros llamados como en el if de abajo, para que esta funcion pueda ser de tipo con parametro e pueda invocarse en en if de la funcion crearProducto de admin.js.o
    // event es un objeto de la pagina web, que registra todo lo que pasa
   // event.preventDefault();  IMPORTANTE: saque el event y el preventDefault porque ahora el submit lo hace la funcion crearProducto en admin.js
    console.log("aqui tengo que validar todo de nuevo");
    // volver a validar todos los campos
    //if(preguntar si el codigo es correcto && pregunto si el producto es correcto)
    let alerta = document.querySelector("#msjAlerta"); // corri aqui arriba la variable que llama el id alerta, para que sea valido dentro del if
    if(campoRequerido(campoCodigo) && campoRequerido(campoProducto) && campoRequerido(campoDescripcion) && validarNumeros(campoCantidad) && validarURL(campoURL)){
        console.log("si paso la validacion");
        alerta.className = "alert alert-danger my-5 d-none";
        return true;  // introduzco valores booleanos que antes no puse, ahora porque estoy usando esta funcion dentro de un if, el if de la funcion crearProducto del archivo admin.js.
    }else{
        console.log("no paso la validacion");
        alerta.className = "alert alert-danger my-5";
        return false;
    }
}