/*  Imports  */
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();
const pug = require('pug');



/* Seteos del Sevidor */
const app = express();
const port = 3000



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



app.set('view engine', 'pug')
app.set("views", __dirname + "/views")


/* Variables Para la API */
let productos = [ ]
let producto
let nuevo_producto
let id = 0


/* API */

/* Mostrar Productos en tabla  */
app.get('/productos/vista', (req, res) => {
    res.render('main2', {"productos":productos, "tamaño": productos.length});
});



app.get("/", (req, res) => {
    res.render('index');
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






router.post('/productos/guardar/', (req, res) => {
    id += 1
    req.body.id = id
    producto = req.body
    productos.push(producto)
    return res.redirect("http://localhost:8080/")
});



app.use('/api', router);


app.listen(8080, () =>
    console.log(`Escuchando el servidor en 8080!`),
);