const productosDiv = document.getElementById("productos");
const mostrarCatalogo = document.getElementById("mostrarCatalogo");
const selectOrden = document.getElementById("selectOrden");
const agregarProductoBtn = document.getElementById("guardarProductoBtn");
const buscador = document.getElementById("buscador");
const coincidencia = document.getElementById("coincidencia");
const botonCarrito = document.getElementById("botonCarrito");
const precioTotal = document.getElementById("precioTotal");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

function verCatalogo(array) {
    console.log(productosDiv);
    productosDiv.innerHTML = ``;
    for (let producto of array) {
        let cargaProductoDiv = document.createElement("div");
        cargaProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2";
        cargaProductoDiv.innerHTML = `<div class="card" style="width: 22rem;">
                                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title" style="font-size:1rem;">${producto.nombre}</h5>
                                    <p class="${producto.precio <= 2000 && "ofertaProducto"}">Precio: ${producto.precio}</p>
                                    <button id="${producto.id}" class="btn btn-primary">Agregar al carrito</button>
                                    </div>
                                    </div>`;
        productosDiv.appendChild(cargaProductoDiv);

        let agregarBtn = document.getElementById(`${producto.id}`);
        agregarBtn.addEventListener("click", agregarAlCarrito);
    }
}
function agregarAlCarrito(e) {
    const id = parseInt(e.target.id);

    const productoAgregado = productos.find((elem) => elem.id == id);
    console.log(productoAgregado);

    const existe = productosEnCarrito.some((elem) => elem.id == id);

    if (!existe) {

        const prodAlCarrito = {
            ...productoAgregado,
            cantidad: 1,
        }

        productosEnCarrito.push(prodAlCarrito);

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        console.log(productosEnCarrito);

        Swal.fire({
            title: `Agregaste un producto al carrito`,
            text: `El videojuego ${productoAgregado.nombre} con el precio de: $${productoAgregado.precio} ha sido agregado`,
            confirmButtonColor: "blue",
            confirmButtonText: "Producto agregado al carrito",
            imageUrl: `${productoAgregado.imagen}`,
            imageHeight: 382,
        });
    } else {

        Swal.fire({
            title: `El producto ya existe en el carrito`,
            icon: "info",
            timer: 2000,
            showConfirmButton: false,
        });
    }
    cargarProductosCarrito();
}

function cargarProductosCarrito() {
    const modalBodyCarrito = document.getElementById("modal-bodyCarrito");
    modalBodyCarrito.innerHTML = '';
    productosEnCarrito.forEach((p) => {
        const cardEnCarrito = document.createElement("div");
        cardEnCarrito.innerHTML = `
                            <div class="card border-primary mb-2" id ="productoCarrito${p.id}" style="max-width: 520px;">
                    <img class="card-img-top" height="382px" src="${p.imagen}" alt="">
                    <div class="card-body">
                    <h4 class="card-title">${p.nombre}</h4>
                    <p class="card-text">$${p.precio}</p>
                    <p class="card-text">Cantidad: ${p.cantidad}</p> 
                    <p class="card-text">SubTotal: ${p.cantidad * p.precio}</p>   
                    <button data-id=${p.id} class="btn btn-success" id="botonSumarUno${p.id}">+</button>
                    <button data-id=${p.id} class="btn btn-danger" id="botonRestarUno${p.id}">-</button> 
                    <button data-id=${p.id} class="btn btn-danger" id="botonEliminar${p.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>    
                </div>`;
        modalBodyCarrito.appendChild(cardEnCarrito);

        //Sumar unidad
        const btnSumar = document.getElementById(`botonSumarUno${p.id}`);
        btnSumar.addEventListener("click", sumarProdCarrito);

        const btnRestar = document.getElementById(`botonRestarUno${p.id}`);
        btnRestar.addEventListener("click", restarProdCarrito);

        //Restar unidad
        const btnVaciar = document.getElementById(`botonEliminar${p.id}`)
        btnVaciar.addEventListener("click", eliminarProductoDelCarrito);
    });
    calcularTotal(productosEnCarrito)
}

function sumarProdCarrito(e) {
    const id = parseInt(e.target.dataset.id);
    console.log(id);

    const index = productosEnCarrito.findIndex(p => p.id === id);

    productosEnCarrito[index].cantidad++;

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function restarProdCarrito(e) {
    const id = parseInt(e.target.dataset.id)
    console.log(id);

    const indice = productosEnCarrito.findIndex(p => p.id === id)
    console.log(productosEnCarrito[indice]);
    productosEnCarrito[indice].cantidad--;


    if (productosEnCarrito[indice].cantidad == 0) {
        productosEnCarrito.splice(indice, 1)
    }

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

function eliminarProductoDelCarrito(e) {
    const id = parseInt(e.target.dataset.id)

    const indice = productosEnCarrito.findIndex(p => p.id === id)
    productosEnCarrito.splice(indice, 1);

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

cargarProductosCarrito();


function calcularTotal() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    for (let productoCarrito of productosEnCarrito) {
        total += productoCarrito.precio * productoCarrito.cantidad;
    }
    if (total == 0) {
        precioTotal.innerHTML = `No hay productos en el carrito`;
        return;
    }
    precioTotal.innerHTML = `El total es <strong>${total}</strong>`;
    return total
}
calcularTotal();

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
    const productoNuevo = new Producto(array.length + 1, nombreIngresado.value, parseInt(precioIngresado.value), 1, "../img/mario_new.png")
    array.push(productoNuevo)
    localStorage.setItem("productos", JSON.stringify(array))
    verCatalogo(array)

    nombreIngresado.value = ""
    precioIngresado.value = ""

    Toastify(
        {
            text: `El videojuego ${productoNuevo.nombre} se ha agregado`,
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                color: "white",
                background: "blue"
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

function finalizarCompra(array) {
    Swal.fire({
        title: '¿Estás seguro de realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, me los llevo',
        cancelButtonText: 'No, me arrepentí',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            let totalFinal = calcularTotal(array)
            Swal.fire({
                title: '¡Felicidades! Terminaste tu compra',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por tu compra. El total es de: ${totalFinal} `,
            })
            //nivel arrays resear productosEnCarrito
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        } else {
            Swal.fire({
                title: '¡Qué lastima!',
                icon: 'info',
                text: `Los productos que elegiste quedarán en el carrito por si cambias de opinión`,
                confirmButtonColor: 'green',
                timer: 3500
            })
        }
    })
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
verCatalogo(productos)

botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra(productosEnCarrito)
})