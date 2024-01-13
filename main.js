//Constructor Productos
function Producto(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
}
let buzo1 = new Producto(
    1,
    "Buzo Astro White",
    25000,
    "/imagenes/imagen8.jpeg"
);
let buzo2 = new Producto(
    2,
    "Buzo Astro",
    23000,
    "/imagenes/imagen7.jpeg"
);
let buzo3 = new Producto(
    3,
    "Buzo Astro Black",
    24000,
    "/imagenes/imagen5.jpeg"
);
let buzo4 = new Producto(
    4,
    "Buzo Astro Black",
    30000,
    "/imagenes/imagen1.jpeg"
);

const productos = [buzo1,buzo2,buzo3,buzo4];

let carrito = [];
let carritoStorage = localStorage.getItem("carrito");

//Si el carrito Storage tiene Algo carrito agarra la info del JSON
if (carritoStorage){
    carrito = JSON.parse(carritoStorage);
}

//Location.reload(); RECARGA LA PAGINA
//LocalStorage.clear(); //Borra el storage
let botonCarrito = document.getElementById("botonCarrito");
botonCarrito.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//Funcion para Agregar Productos al Carrito
const agregarProducto = (id) =>{
    const producto = productos.find((item) => item.id === id);

    carrito.push(producto);
    //Se agrega al Storage el Producto seleccionado
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Se recorren los productos destacados y se muestran dentro de su respectivo contenedor
let contenedorDest = document.getElementById("contenedorDestacados");
productos.forEach ((item) =>{
    let div = document.createElement("div");
    div.classList.add('cardShop');
    
    div.innerHTML = `
    <img class="imgCard" src= "${item.imagen}" alt="Imagen Producto">

        <div class="ps-2 pt-2">
            <p>${item.nombre}</p>
        </div>

        <div class="ps-2 priceConf">
            <p>$${item.precio}</p>
        </div>
        <div class="CajaProductosShopShadow ps-2">
            <button id="boton${item.id}" class="buttonShop"> COMPRAR </button>
        </div>
        `;
    //Se agregan al contenedor
    contenedorDest.append(div);

    let boton = document.getElementById(`boton${item.id}`);

    boton.addEventListener("click", () => agregarProducto(item.id));
});

