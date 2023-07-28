class Producto {
    constructor(id, nombre, precio, cantidad, imagen) {
            this.id = id,
            this.nombre = nombre,
            this.precio = precio,
            this.cantidad = cantidad,
            this.imagen = imagen
    }
    mostrarInfoProducto() {
        console.log(`El producto ${this.nombre} tiene un precio de ${this.precio}`)
    }
}
const articulo1 = new Producto(1, "Super Mario Bros.™ Wonder", 61539, 1, "../img/mario_1.png")
const articulo2 = new Producto(2, "Super Mario™ 3D World + Bowsers Fury", 61539, 1, "../img/mario_2.png")
const articulo3 = new Producto(3, "Mario Kart™ 8 Deluxe", 34809, 1, "../img/mario_3.png")
const articulo4 = new Producto(4, "Mario + Rabbids spark of hope", 36999, 1, "../img/mario_4.png")
const articulo5 = new Producto(5, "WarioWare™: Get It Together!", 39689, 1, "../img/mario_6.png")
const articulo6 = new Producto(6, "Captain Toad™: Treasure Tracker", 37689, 1, "../img/mario_5.png")
const articulo7 = new Producto(7, "Super Mario Party", 61539, 1, "../img/mario_7.png")
const articulo8 = new Producto(8, "Paper Mario™: The Origami King", 61539, 1, "../img/mario_8.png")
const articulo9 = new Producto(9, "Nintendo Switch", 375654, 1, "../img/mario_9.png")

let productos = []  
if(localStorage.getItem("productos")){
    productos = JSON.parse(localStorage.getItem("productos"))
}else{
    productos.push(articulo1, articulo2, articulo3, articulo4, articulo5, articulo6, articulo7, articulo8, articulo9)
    localStorage.setItem("productos", JSON.stringify(productos))
}