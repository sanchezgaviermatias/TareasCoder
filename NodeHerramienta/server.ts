/* Librerias y SetUp */

const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();
const fs  =require("fs")


const port = 8080

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(express.static("./public"))


/* Variables Globales */
let productos = []
let mensajes = []
let producto
let nuevo_producto
let id = 0

/* Crea el Achivo mensajes.json */
fs.writeFileSync('mensajes.json', JSON.stringify(mensajes)  ,  function (err) {
    if (err) throw err;
    console.log('Guardado sin Errores!');
  });
  

/* Servidor */
io.on('connection', (sockets) => {
    console.log("nueva conexion!")


    /* Cuando arranca enviamos los mensajes y productos que ya estaban */
    sockets.emit("data", {productos, id})
    sockets.emit("mensajes_iniciales" ,mensajes)

    /* Cada vez que se agrega un nuevo producto le avisamos al resto de usuarios */
    sockets.on('nuevo producto', (data) => {
        id +=1 
        productos.push({
            ...data,
            "id": id
        })
        io.sockets.emit("nuevoProducto", data)
        console.log()
    })


    /* Hacemos que el nuevo mensaje sea visible para todos */
    sockets.on('nuevo mensaje', (mensaje) => {
        mensajes.push(mensaje)
        console.log(mensajes)
        io.sockets.emit("MensjaNuevo", mensaje)
        fs.writeFileSync('mensajes.json', JSON.stringify(mensajes)  ,  function (err) {
            if (err) throw err;
            console.log('Guardado sin Errores!');
          });
    })
})






/* Página Principal */
app.get('/', (req, res) => {
  res.sendFile( __dirname +"/index.html")
})



http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})