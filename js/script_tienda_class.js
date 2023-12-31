class Producto {
    constructor(id, nombre, precio, cantidad, imagen) {
            this.id = id,
            this.nombre = nombre,
            this.precio = precio,
            this.cantidad = cantidad,
            this.imagen = imagen
    }
}
// const producto1 = new Producto(1, "Super Mario Bros.™ Wonder", 61539, 1, "../img/mario_1.png")
// const producto2 = new Producto(2, "Super Mario™ 3D World + Bowsers Fury", 61539, 1, "../img/mario_2.png")
// const producto3 = new Producto(3, "Mario Kart™ 8 Deluxe", 34809, 1, "../img/mario_3.png")
// const producto4 = new Producto(4, "Mario + Rabbids spark of hope", 36999, 1, "../img/mario_4.png")
// const producto5 = new Producto(5, "WarioWare™: Get It Together!", 39689, 1, "../img/mario_6.png")
// const producto6 = new Producto(6, "Captain Toad™: Treasure Tracker", 37689, 1, "../img/mario_5.png")
// const producto7 = new Producto(7, "Super Mario Party", 61539, 1, "../img/mario_7.png")
// const producto8 = new Producto(8, "Paper Mario™: The Origami King", 61539, 1, "../img/mario_8.png")
// const producto9 = new Producto(9, "Nintendo Switch", 375654, 1, "../img/mario_9.png")

const cargarProductos = async () => {
    const res = await fetch("../js/productos.json")
    const data = await res.json()
    console.log(data)
    for(let producto of data) {
        let productoData = new Producto(producto.id, producto.nombre, producto.precio, producto.cantidad, producto.imagen)
        productos.push(productoData)
    }
    localStorage.setItem("productos", JSON.stringify(productos))
}

let productos = []

if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
} else {
    cargarProductos()
}


