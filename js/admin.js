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
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || []; // no podemos dejar el arreglo indicado como vacio, porque si no cada vez que refrescamos la paginas, perdemos lod objetos almacenados en Local Storage. Por eso: el metodo parse transforma de nuevo en codigo js los objetos almacenados en Local Storage, que estan en formato JSON, e indicamos la ruta: localStorage - getItem nos retorna los objetos de ese arreglo llamado con nuestra palabra clave - en el caso en que este vacio el Local storage - entonces || [] nos da el arreglo de js vacio y no tendremos errores.

campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)});
formularioProducto.addEventListener("submit", guardarProducto); // antes aqui habia la funcion validarGeneral. Ahora no funciona porque siendo sin parametro y habiendola trasladada a otro archivo js, aqui no funciona (las demas tienen parametro y por eso funcionan). Asi cree una nueva funcion, guardarProducto, que ahora se ocupara del submit para la creacion de un nuevo objeto.

// Llamar  ala funcion cargaInicial()
cargaInicial(); // ha de ser llamada luego de listaProducto, para antes saber si en localStorage hay o no hay objetos guardados en el arreglo.

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
     // guardar en Local Storage el arreglo de productos para no perderlos
     guardarLocalStorage();
     // mostrar un mensaje al usuario
     Swal.fire(
        'Producto creado',
        'Su producto fue correctamente creado',
        'success'
      )
      // creo una nueva fila en la tabla
      crearFila(productoNuevo);
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

function guardarLocalStorage(){
    localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos)); // setItem es el meotodo para guardar nuestro arreglo de productos en Local storage. Tenemos que inventar una palabra clave de acceso, luego JSON con metodo stringify(invocar nuestro arreglo de productos).
}

function crearFila (productoNuevo){
    let tabla = document.querySelector("#tablaProductos");
    tabla.innerHTML += `<tr>
    <td>${productoNuevo.codigo}</td>
    <td>${productoNuevo.producto}</td>
    <td>${productoNuevo.descripcion}</td>
    <td>${productoNuevo.cantidad}</td>
    <td>${productoNuevo.url}</td>
    <td>
      <button class="btn btn-warning" onclick=prepararEdicionProducto(${productoNuevo.codigo})>Editar</button>
      <button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`
}

function cargaInicial(){ //fijarse que hayan objetos cargados en Local Storage para que funcione
    // si hay datos en localstorage o en listaProductos dibujo las filas de la tabla
    if(listaProductos.length > 0){
        // dibujar fila
        listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)}) // dentro la funcion anonima iventamos un parametro que significa cada objeto que tiene el arreglo. el forEach SOLO funciona cuando llamamos a todos los elementos del arreglo
    }
}

function borrarTabla(){
    let tabla = document.querySelector("#tablaProductos");
    tabla.innerHTML = ""  // este comando sirve para borrar los valores de la tabla.
}

 window.prepararEdicionProducto = function (codigo){ // usamos window con la funcion para editar producto: esto porque siendo el admin.html viculado un tipo modulo, y esta funcion en admin.js de tipo local, nos da error. Asi que tenemos que globalizar esta funcion.
    console.log(codigo);
    // obtener el objeto a modificar
    let productoBuscado = listaProductos.find((buscarProducto)=>{return buscarProducto.codigo == codigo}) //la funcion find es parecida al forEach: aca tambien se inventa un parametro. Pero el find busca el objeto que corresponda a la condicion logica del return, que a su vez exige que el objeto del parametro de la funcion prepararEdicionProducto sea igual al codigo del producto que el find busca en el arreglo del localstorage
    console.log(productoBuscado);
    //mostrar los datos en el form
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    campoURL.value = productoBuscado.url; // de esta forma, al presionar el boton EDITAR de la tabla, el objeto correspondiente sera visualizado en el formulario automaticamente.
}