//Si el carrito Esta vacio instanciamos un array vacio, si contiene algun producto entonces le asignamos esos productos a
//nuestra variable carrito

JSON.parse(localStorage.getItem("carrito")) === null && localStorage.setItem("carrito", JSON.stringify([]))

let carrito = JSON.parse(localStorage.getItem("carrito"))

//Location.reload(); RECARGA LA PAGINA
//LocalStorage.clear(); //Borra el storage

//Funcion para Agregar Productos al Carrito

const agregarProducto = (id) => {
    fetch("datos/productos.json")
        .then(response => response.json())
        .then(datos => {
            const producto = datos.find((item) => item.id === id);

            const { nombre, precio, imagen } = producto

            productoCarrito = carrito.find((item) => item.id === id)

            if (productoCarrito === undefined) {
                const nuevoProductoCarrito = {
                    id: id,
                    nombre: nombre,
                    precio: precio,
                    imagen: imagen,
                    cantidad: 1

                }

                carrito.push(nuevoProductoCarrito)
                //Se agrega al Storage el Producto seleccionado
                localStorage.setItem("carrito", JSON.stringify(carrito));

            } else {
                const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)

                carrito[indexProductoCarrito].cantidad++
                
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }

            carrito = JSON.parse(localStorage.getItem("carrito"))

            //Alerta Producto Agregado
            Toastify({

                text: "Producto Agregado al Carrito Correctamente",
                duration: 3000,
                position: "center"
                }).showToast();
        })
}

//Elementos Traidos del HTML para hacer funcionar el carrito
let botonCarrito = document.getElementById("botonCarrito");
const contenidoDelCarrito = document.getElementById("carritoContent");



//Codigo para Visualizar el carrito de Compras
const mostrarCarrito = () => {
    
    contenidoDelCarrito.innerHTML = "";
    contenidoDelCarrito.style.display = "flex";
    const headerCarrito = document.createElement("div");
    headerCarrito.className = "modal-header";
    headerCarrito.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    contenidoDelCarrito.append(headerCarrito);
    contenidoDelCarrito.classList.add('carritoVisible')

    const botonCierreCarrito = document.createElement("h1");
    botonCierreCarrito.innerText = "x";
    botonCierreCarrito.className = "modal-header-button";

    //Estilos Boton cerrar
    botonCierreCarrito.addEventListener("click", () => {
        contenidoDelCarrito.style.display = "none";
    });

    headerCarrito.append(botonCierreCarrito);

    //Recorremos el carrito y por cada producto se crea una card que mostrara el mismo en el apartado carrito
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "configItem";
        carritoContent.innerHTML = `
        <img src="${producto.imagen}">
        <h2>${producto.nombre}</h2>
        <p>$${producto.precio}</p>
        <span class = "restar"> - </span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class ="sumar"> + </span>
        <p>Total: $${producto.cantidad * producto.precio}</p>
        <span class ="delete-product">x</span>
        `;

        //lo agregamos al modalContainer
        contenidoDelCarrito.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
                
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });



    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-content";
    totalCarrito.innerHTML = `Total: $${total}`;
    contenidoDelCarrito.append(totalCarrito);
};

const eliminarProducto = (id) => {
    const idProducto = carrito.find((producto) => producto.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== idProducto;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}




//Se recorren los productos destacados y se muestran dentro de su respectivo contenedor

fetch("datos/productos.json")
    .then(response => response.json())
    .then(datos => {
        let contenedorDest = document.getElementById("contenedorDestacados");
        datos.forEach((item) => {
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
        })
    });

botonCarrito.addEventListener("click", mostrarCarrito)