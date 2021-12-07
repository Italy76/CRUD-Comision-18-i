function campoRequerido(input){
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

function validarNumeros(input){
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

function validarURL(input){
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

function validarGeneral(event){ // event es un objeto de la pagina web, que registra todo lo que pasa
    event.preventDefault();
    console.log("aqui tengo que validar tod de nuevo");
    // volver a validar todos los campos
    //if(preguntar si el codigo es correcto && pregunto si el producto es correcto)
    let alerta = document.querySelector("#msjAlerta"); // corri aqui arriba la variable que llama el id alerta, para que sea valido dentro del if
    if(campoRequerido(campoCodigo) && campoRequerido(campoProducto) && campoRequerido(campoDescripcion) && validarNumeros(campoCantidad) && validarURL(campoURL)){
        console.log("si paso la validacion");
        alerta.className = "alert alert-danger my-5 d-none";
    }else{
        console.log("no paso la validacion");
        alerta.className = "alert alert-danger my-5";
    }
}
// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");

campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)});
formularioProducto.addEventListener("submit", validarGeneral);