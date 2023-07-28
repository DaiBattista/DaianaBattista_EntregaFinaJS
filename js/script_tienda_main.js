let productosDiv = document.getElementById("productos")
let mostrarCatalogo = document.getElementById("mostrarCatalogo")
let selectOrden = document.getElementById("selectOrden")
let agregarProductoBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")

let productosEnCarrito
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}

function verCatalogo(array) {
    productosDiv.innerHTML = ``
    for (let producto of array) {
        let cargaProductoDiv = document.createElement("div")
        cargaProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
        cargaProductoDiv.innerHTML = `<div id="${producto.id}" class="card" style="width: 22rem;">
                                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title" style="font-size:1rem;">${producto.nombre}</h5>
                                    <p class="${producto.precio <= 2000 && "ofertaProducto"}">Precio: ${producto.precio}</p>
                                    <button id="agregarBtn${producto.id}" class="btn btn-primary">Agregar al carrito</button>
                                        </div>
                                    </div>`
        productosDiv.appendChild(cargaProductoDiv)

        let agregarBtn = document.getElementById(`agregarBtn${producto.id}`)

        agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(producto)
        })
    }

}
function agregarAlCarrito(producto) {
    let productoAgregado = productosEnCarrito.find((elem) => elem.id == producto.id)
    if (productoAgregado == undefined) {
        productosEnCarrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        console.log(productosEnCarrito)

        Swal.fire({
            title: `Agregaste un producto al carrito`,
            text: `El videojuego ${producto.nombre} con el precio de: $${producto.precio} ha sido agregado`,
            confirmButtonColor: "green",
            confirmButtonText: "Gracias",
            imageUrl: `${producto.imagen}`,
            imageHeight: 200
        })
    } else {

        Swal.fire({
            title: `El producto ya existe en el carrito`,
            icon: "info",
            timer: 2000,
            showConfirmButton: false
        })
    }
}

function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ``
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML +=
            `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                    <img class="card-img-top" height="300px" src="${productoCarrito.imagen}" alt="">
                    <div class="card-body">
                    <h4 class="card-title">${productoCarrito.nombre}</h4>
                        <p class="card-text">$${productoCarrito.precio}</p> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>    
                </div>`
    })

    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            console.log(`Eliminar producto`)
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find((producto) => producto.id == productoCarrito.id)
            console.log(productoEliminar)
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            array.splice(posicion, 1)
            console.log(array)
            localStorage.setItem("carrito", JSON.stringify(array))

            calcularTotal(array)
        })
    })
    calcularTotal(array)

}

function calcularTotal(array) {
    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` : precioTotal.innerHTML = `El total es <strong>${total}</strong>`
}

function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    console.log(menorMayor)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((elem1, elem2) => elem2.precio - elem1.precio)
    verCatalogo(mayorMenor)
}

function ordenarAlfabeticamente(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })

    verCatalogo(arrayAlfabetico)
}

function agregarProducto(array) {
    let nombreIngresado = document.getElementById("nombreInput")
    let precioIngresado = document.getElementById("precioInput")
    const productoNuevo = new Producto(array.length + 1, nombreIngresado.value, precioIngresado.value, 1, "../img/mario_new.png")
    array.push(productoNuevo)
    localStorage.setItem("productos", JSON.stringify(array))
    verCatalogo(array)

    nombreIngresado.value = ""
    precioIngresado.value = ""

    //Toastify
    Toastify(
        {
            text: `El videojuego ${productoNuevo.nombre} se ha agregado`,
            duration: 3000,
            gravity: "bottom",//top o buttom,
            position: "center",//left, right o center
            style: {
                color: "white",
                background: "green"
            }
        }
    ).showToast()
}

function buscarInfo(buscado, array) {
    let busqueda = array.filter(
        (dato) => dato.nombre.toLowerCase().includes(buscado.toLowerCase()) || dato.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con la búsqueda ${buscado}</h3>`,
            verCatalogo(busqueda)) :
        (coincidencia.innerHTML = "", verCatalogo(busqueda))
}

agregarProductoBtn.addEventListener("click", function (event) {
    event.preventDefault()
    agregarProducto(productos)
})

mostrarCatalogo.addEventListener("click", () => {
    verCatalogo(productos)
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(productos)
            break
        case "2":
            ordenarMenorMayor(productos)
            break
        case "3":
            ordenarAlfabeticamente(productos)
            break
        default:
            verCatalogo(productos)
            break
    }
}
)
buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, productos)
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})