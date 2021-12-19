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
let productoExistente = false; // si productoExistente es igual a false entonces quiero crear un nuevo producto; en caso contrario quiero modificar.
let btnAgregar = document.querySelector("#btnAgregar")

campoCodigo.addEventListener("blur", ()=>{campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", ()=>{campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", ()=>{campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoURL.addEventListener("blur", ()=>{validarURL(campoURL)});
formularioProducto.addEventListener("submit", guardarProducto); // antes aqui habia la funcion validarGeneral. Ahora no funciona porque siendo sin parametro y habiendola trasladada a otro archivo js, aqui no funciona (las demas tienen parametro y por eso funcionan). Asi cree una nueva funcion, guardarProducto, que ahora se ocupara del submit para la creacion de un nuevo objeto.
btnAgregar.addEventListener("click", limpiarFormulario);

// Llamar  a la funcion cargaInicial()
cargaInicial(); // ha de ser llamada luego de listaProducto, para antes saber si en localStorage hay o no hay objetos guardados en el arreglo.

function guardarProducto(event){
    event.preventDefault()
    // validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
        if(productoExistente == false){
            // caso 1: agregar o crear un producto
        crearProducto();
        }else{
           // caso 2: el usuario quiere editar un producto
        modificarProducto();
        }  
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
    // limpiar la variable booleana
    productoExistente = false; // cuando se modifica un producto de la tabla, usando el boton editar la variable va en true. Es necesario volverla en false para que se pueda crear un nuevo producto.
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
      <button class="btn btn-danger" onclick=borrarProducto(${productoNuevo.codigo})>Borrar</button>
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

 window.prepararEdicionProducto = function (codigo){ // usamos window con la funcion para editar producto: esto porque aca en admin.js hicimos codigo html en crearFilas, y le agregamos esta funcion. Siendo admin.js vinculado a un archivo (admin.html) de tipo module, nos daria un error. Por esto transformamos la funcion preparEdicionProducto en global usndo el objeto window.
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
    // aqui modifico la variable booleana
    productoExistente = true; // tenemos que indicar cuando el usuario quiere editar el producto, y no crear uno nuevo.
}

function modificarProducto(){
    console.log("aqui quiero modificar este producto");
    // buscar la posicion de mi producto dentro del arreglo
       let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value}); // con findIndex, un bucle, sabemos la posicion de una propiedad y ubicamos en que input del formulario se indica
       console.log(posicionProducto);
    // modificar los datos de ese producto dentro del arreglo
       listaProductos[posicionProducto].producto = campoProducto.value;
       listaProductos[posicionProducto].descripcion = campoDescripcion.value;
       listaProductos[posicionProducto].cantidad = campoCantidad.value;
       listaProductos[posicionProducto].url = campoURL.value; // listaProductos es el arreglo de localstorage[posicion de la propiedad].propiedad = nombre input en el formulario.value para acceder al contenido. Se hace con todas las propiedades del arreglo, excepto codigo, ya que este no se debe modificar.
       console.log(listaProductos);
    // actualizar los datos del localstorage
       guardarLocalStorage();// aqui actualizamos los productos editados o borrados en localstorage
       // mostrar un cartel al usuario
       Swal.fire(
        'Producto modificado',
        'Su producto fue correctamente editado',
        'success'
      )
       //limpiar los datos del formulario
       limpiarFormulario();
    //actualizar la tabla
      borrarTabla();
      //ahora vuelvo a dibujar las filas de la tabla 
      listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
}

window.borrarProducto = function (codigo){
    console.log(codigo);
    // borrar el producto del arreglo
     let arregloProductoBorrado = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo});//el metodo filter funciona asi: guarda en un arreglo todos los objetos cuya propiedad codigo sea diferente (!=) de la propiedad codigo que es paramentro de la funcion borrarProducto. Se borra solo el objeto en que el codigo coincide.
     console.log(arregloProductoBorrado);
    // actualizar los datos en localstorage
     listaProductos = arregloProductoBorrado;
     guardarLocalStorage();
    //  actualizar los datos de la tabla
    borrarTabla();
    // dibujar tabla
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
    // mostrar mensaje al usuario
    Swal.fire(
        'Producto eliminado del sistema',
        'Su producto fue correctamente eliminado del sistema',
        'success'
      )
}