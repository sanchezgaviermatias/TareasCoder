/*  Imports  */
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();
const handlebars = require('express-handlebars');


/* Seteos del Sevidor */
const app = express();




const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static("./public"))

let productos = []
let producto
let nuevo_producto
let id = 0


io.on('connection', (sockets) => {
    console.log("nueva conexion perro 🐾")


    sockets.emit("data", {productos, id})

    sockets.on('nuevo producto', (data) => {
        id +=1 
        productos.push({
            ...data,
            "id": id
        })
        io.sockets.emit("nuevoProducto", data)
        console.log()
    })

})






app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*  Handlebars */
app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', '.hbs');
app.set("views", __dirname + "/views")


/* Variables Para la API */




/* API */

/* Mostrar Productos en tabla  */



app.get("/", (req, res) => {
    res.render('main2', {
        "productos": productos
    });
})


router.put('/productos/actualizar/:id', (req, res) => {
    let req_id = Number(req.params.id)
    nuevo_producto = req.body
    nuevo_producto.id = req_id
    let prueba = productos.filter(x => x.id !== req_id)
    if (prueba.length === 0) {
        res.send("No existe el producto 😲")
    }
    prueba.push(nuevo_producto)
    productos = prueba
    res.json(nuevo_producto)
})



router.delete('/productos/borrar/:id', (req, res) => {
    let req_id = Number(req.params.id)
    let productos_nuevo = productos.filter(x => x.id !== req_id)
    productos = productos_nuevo

    res.send('Producto Eliminado')

})

router.get('/productos/listar', (req, res) => {
    if (productos.length === 0) {
        return res.send({
            Error: "No hay productos cargados."
        })
    }
    return res.send(productos)
});



router.get('/productos/listar/:id', (req, res) => {
    let req_id = req.params.id
    producto_elegido = productos.filter(producto => producto.id == req_id)
    if (producto_elegido.length === 0) {
        return res.send({
            Error: "producto no encontrado"
        })
    }
    return res.send(producto_elegido)
});










app.use('/api', router);






http.listen(8080, () =>
    console.log(`Escuchando el servidor en 8080!`),
);