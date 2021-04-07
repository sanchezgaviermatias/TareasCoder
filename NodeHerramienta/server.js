/* Librerias y SetUp */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var router = express.Router();
var fs = require("fs");
var port = 8080;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static("./public"));
/* Variables Globales */
var productos = [];
var mensajes = [];
var producto;
var nuevo_producto;
var id = 0;
/* Crea el Achivo mensajes.json */
fs.writeFileSync('mensajes.json', JSON.stringify(mensajes), function (err) {
    if (err)
        throw err;
    console.log('Guardado sin Errores!');
});
/* Servidor */
io.on('connection', function (sockets) {
    console.log("nueva conexion!");
    /* Cuando arranca enviamos los mensajes y productos que ya estaban */
    sockets.emit("data", { productos: productos, id: id });
    sockets.emit("mensajes_iniciales", mensajes);
    /* Cada vez que se agrega un nuevo producto le avisamos al resto de usuarios */
    sockets.on('nuevo producto', function (data) {
        id += 1;
        productos.push(__assign(__assign({}, data), { "id": id }));
        io.sockets.emit("nuevoProducto", data);
        console.log();
    });
    /* Hacemos que el nuevo mensaje sea visible para todos */
    sockets.on('nuevo mensaje', function (mensaje) {
        mensajes.push(mensaje);
        console.log(mensajes);
        io.sockets.emit("MensjaNuevo", mensaje);
        fs.writeFileSync('mensajes.json', JSON.stringify(mensajes), function (err) {
            if (err)
                throw err;
            console.log('Guardado sin Errores!');
        });
    });
});
/* Página Principal */
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
http.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
