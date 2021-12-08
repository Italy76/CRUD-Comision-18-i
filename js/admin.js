import {campoRequerido, validarNumeros, validarURL, validarGeneral} from "./validaciones.js"
import {Producto} from "./productoClass.js" // cada import es para uno y un solo archivo .js
// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
//lista de productos
let listaProductos = []

campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)});
formularioProducto.addEventListener("submit", guardarProducto); // antes aqui habia la funcion validarGeneral. Ahora no funciona porque siendo sin parametro y habiendola trasladada a otro archivo js, aqui no funciona (las demas tienen parametro y por eso funcionan). Asi cree una nueva funcion, guardarProducto, que ahora se ocupara del submit para la creacion de un nuevo objeto.

function guardarProducto(event){
    event.preventDefault()
    // validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
        // agregar o crear un producto
        crearProducto();
    }
   
}

function crearProducto(){
    console.log("aqui creo el producto");
    // crear el objeto producto
    let productoNuevo = new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoURL.value); // usamos el .value en los parametros porque queremos ver solo los datos indicatos en el formulario. 
     console.log(productoNuevo);
     //guardar el producto creado en el arreglo listaProductos[]
     listaProductos.push(productoNuevo);
     console.log(listaProductos);
     // limpiar el formulario
     limpiarFormulario();
}

function limpiarFormulario(){
    // limpiar los value de todo el formulario
    formularioProducto.reset();
    // limpiar las clases
    campoCodigo.className = "form-control";
    campoProducto.className = "form-control";
    campoDescripcion.className =  "form-control";
    campoCantidad.className =  "form-control";
    campoURL.className = "form-control";
}