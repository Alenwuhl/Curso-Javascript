const carrito = JSON.parse(localStorage.getItem("carrito"))

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")

cargarProductosCarrito()
botonComprar.addEventListener("click", comprarCarrito)

function cargarProductosCarrito() {
    if (carrito && carrito.length  > 0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
        contenedorCarritoProductos.innerHTML = ""
    
        carrito.forEach(prenda => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${prenda.archivoImagen}" alt="${prenda.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${prenda.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${prenda.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${prenda.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${prenda.precio * prenda.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${prenda.id}"><i class="bi bi-trash-fill"></i></button>
            `
    
            contenedorCarritoProductos.append(div)
        })
    
    actualizarTotal()
    actualizarBotonesEliminar()

    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    
}

function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    let indexAux = 0
    botonesEliminar.forEach(boton => {
        indexAux = carrito.findIndex(prenda => prenda.id === parseInt(boton.id))
        boton.addEventListener("click", () => {Swal.fire({
            title: '¿Quieres eliminar el producto: ' + carrito[carrito.findIndex(prenda => prenda.id === parseInt(boton.id))].nombre  + '?',
            imageUrl: "../img/Daisy_Flower_Y2K_Icon_Instagram_Profile_Picture-removebg-preview (1).png",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'Tu producto ha sido eliminado',
                'success'
              )
              eliminarDelCarrito(boton.id)
            }
          })})
        
    })
}

function eliminarDelCarrito(idBoton) {
    /*const idBoton = e.currentTarget.id;*/
    const index = carrito.findIndex(prenda => prenda.id === parseInt(idBoton))

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1
    } else{
        carrito.splice(index, 1)
    }
    
    cargarProductosCarrito()
    
    localStorage.setItem("carrito", JSON.stringify(carrito))

}
function actualizarTotal() {
    const totalCalculado = carrito.reduce((acc, prenda) => acc + (prenda.precio * prenda.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

function comprarCarrito() {

    carrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
    
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")

}