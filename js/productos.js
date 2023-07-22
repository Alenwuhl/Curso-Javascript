// Defino los Arrays
const prendas = [
    {id: 1, nombre: "Teddy", precio: 2990, descripcion: "Estás buscando un buzo suave y calentito? Esta es tu mejor opción.", archivoImagen: "../img/fotoTeddy.jpg", cantidad: 0,
                             talles:[{talleId: "XL", colores:[{colorId:"BL", colorNombre:"Blanco", stock:10},
                                                              {colorId:"NE", colorNombre:"Negro", stock:5}]},
                                     {talleId: "L",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                              {colorId:"NE", colorNombre:"Negro", stock:3},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:25}]},
                                     {talleId: "M",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:18},
                                                              {colorId:"NE", colorNombre:"Negro", stock:13},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:225}]},
                                     {talleId: "S",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                              {colorId:"NE", colorNombre:"Negro", stock:1},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:15}]}]
    },
    {id: 2, nombre: "Buzo Jogging", precio: 3800, descripcion: "Estás buscando un buzo suave y calentito? Esta es tu mejor opción.",archivoImagen: "../img-2/fotoBuzo.jpg", cantidad: 0,
                             talles:[{talleId: "XL", colores:[{colorId:"BL", colorNombre:"Blanco", stock:10},
                                                              {colorId:"NE", colorNombre:"Negro", stock:5}]},
                                     {talleId: "L",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                              {colorId:"NE", colorNombre:"Negro", stock:3},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:25}]},
                                     {talleId: "M",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:18},
                                                              {colorId:"NE", colorNombre:"Negro", stock:13},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:225}]},
                                     {talleId: "S",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                              {colorId:"NE", colorNombre:"Negro", stock:1},
                                                              {colorId:"RO", colorNombre:"Rojo", stock:15}]}]
    },                                                            
    {id: 3, nombre: "Remera", precio: 1900, descripcion: "Estás buscando un buzo suave y calentito? Esta es tu mejor opción.",archivoImagen: "../img-3/fotoRemeraXL.jpg", cantidad: 0,
                            talles:[{talleId: "XL", colores:[{colorId:"BL", colorNombre:"Blanco", stock:10},
                                                            {colorId:"NE", colorNombre:"Negro", stock:5}]},
                                    {talleId: "L",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                            {colorId:"NE", colorNombre:"Negro", stock:3},
                                                            {colorId:"RO", colorNombre:"Rojo", stock:25}]},
                                    {talleId: "M",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:18},
                                                            {colorId:"NE", colorNombre:"Negro", stock:13},
                                                            {colorId:"RO", colorNombre:"Rojo", stock:225}]},
                                    {talleId: "S",  colores:[{colorId:"BL", colorNombre:"Blanco", stock:8},
                                                            {colorId:"NE", colorNombre:"Negro", stock:1},
                                                            {colorId:"RO", colorNombre:"Rojo", stock:15}]}]
    }
]

class Prenda {
  constructor(id, nombre, precio, talles, descripcion, archivoImagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.talles = talles;
    this.descripcion = descripcion;
    this.archivoImagen = archivoImagen;
  }
  getNombre() {
    return this.nombre
  }
  getTalles(){
    return this.talles
  }
}

class Talle {
  constructor(talleId, colores) {
    this.talleId = talleId;
    this.colores = colores;
  }
}

class Color {
  constructor(colorId, colorNombre, stock) {
    this.colorId = colorId;
    this.colorNombre = colorNombre;
    this.stock = stock;
  }
}

/* Acá creamos una instancia de Prendas y la cargamos con la const que definimos primero */
const prendasClase = prendas.map(prenda => {
    const tallesClase = prenda.talles.map(talle => {
      const coloresClase = talle.colores.map(color => new Color(color.colorId, color.colorNombre, color.stock));
      return new Talle(talle.talleId, coloresClase);
    });
    return new Prenda(prenda.id, prenda.nombre, prenda.precio, tallesClase);
  });
let carrito = []

cargarProductos();

const botonesComprar = document.querySelectorAll(".agregarPrenda")

botonesComprar.forEach(boton => boton.addEventListener("click", () => {
  agregarAlCarrito(boton)
}))

const numerito = document.querySelector("#numeroCarrito")


function retornarCard(prenda) {

    return  `<div class="col-lg-4 col-md-12 p-4">
                <div class="card aos-init aos-animate" data-aos="fade-up">
                <img src="${prenda.archivoImagen}" class="card-img-top" alt="${prenda.nombre}">
                  <div class="card-body">
                        <h5 class="card-title">${prenda.nombre}</h5>
                        <p class="card-text">${prenda.descripcion}</p>
                        <p class="card-text">Precio: ${prenda.precio} pesos</p>
                        <a href="galeriaBear.html#id${prenda.nombre}" class="btn btn-primary">Ver fotos</a>
                        <button class="btn btn-success agregarPrenda" id="${prenda.id}">Comprar</button>
                    </div>
               </div>
            </div>`
       
  }

  let productosEnCarritoLS = localStorage.getItem("carrito")
  
  if (productosEnCarritoLS) {
      carrito = JSON.parse(productosEnCarritoLS)
      actualizarNumerito();
  } else {
      carrito = [];
  }

function cargarProductos() {
    const container = document.querySelector('#containerCards')
    prendas.forEach((prendaElement)=> {
        container.innerHTML += retornarCard(prendaElement)
    })
}
function cargarClases() {
  prendas.forEach((prendaElement)=>{
      const prenda = new Prenda(prendaElement.id, prendaElement.nombre, prendaElement.precio, prendaElement.talles, prendaElement.descripcion, prendaElement.archivoImagen)
      console.log(prenda.getNombre())
  })
}

function agregarAlCarrito(e) {
  const idBoton = e.id
  const prendaAgregada = prendas.find(prendas => prendas.id === parseInt(idBoton))
  if (carrito.some(prendas => prendas.id === parseInt(idBoton))) {
      const index = carrito.findIndex(prendas => prendas.id === parseInt(idBoton))
      carrito[index].cantidad++
  }else{
      prendaAgregada.cantidad = 1
      carrito.push(prendaAgregada)
  }

  actualizarNumerito()
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function actualizarNumerito() {
  let nuevoNumerito = carrito.reduce((acc, prenda) => acc + prenda.cantidad, 0)
  numerito.innerText = " (" + nuevoNumerito + ")"
}

