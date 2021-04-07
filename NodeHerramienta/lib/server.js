"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Librerias y SetUp */
var express = require('express');

var path = require('path');

var bodyParser = require("body-parser");

var router = express.Router();

var fs = require("fs");

liusta = [2, 3];
liusta.map(function (x) {
  return console.log(x);
});
var port = 8080;
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express["static"]("./public"));
/* Variables Globales */

var productos = [];
var mensajes = [];
var producto;
var nuevo_producto;
var id = 0;
/* Crea el Achivo mensajes.json */

fs.writeFileSync('mensajes.json', JSON.stringify(mensajes), function (err) {
  if (err) throw err;
  console.log('Guardado sin Errores!');
});
/* Servidor */

io.on('connection', function (sockets) {
  console.log("nueva conexion!");
  /* Cuando arranca enviamos los mensajes y productos que ya estaban */

  sockets.emit("data", {
    productos: productos,
    id: id
  });
  sockets.emit("mensajes_iniciales", mensajes);
  /* Cada vez que se agrega un nuevo producto le avisamos al resto de usuarios */

  sockets.on('nuevo producto', function (data) {
    id += 1;
    productos.push(_objectSpread(_objectSpread({}, data), {}, {
      "id": id
    }));
    io.sockets.emit("nuevoProducto", data);
    console.log();
  });
  /* Hacemos que el nuevo mensaje sea visible para todos */

  sockets.on('nuevo mensaje', function (mensaje) {
    mensajes.push(mensaje);
    console.log(mensajes);
    io.sockets.emit("MensjaNuevo", mensaje);
    fs.writeFileSync('mensajes.json', JSON.stringify(mensajes), function (err) {
      if (err) throw err;
      console.log('Guardado sin Errores!');
    });
  });
});
/* Página Principal */

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
http.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});