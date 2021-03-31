const socket = io();



let id 

socket.on("data", datas => {
    productos = datas.productos
    id  = datas.id 
    mitabla = document.getElementById('mitabla')
    if (mitabla) {
        productos.forEach(element => {
            row = mitabla.insertRow(1);
            cell0 = row.insertCell(0);
            cell1 = row.insertCell(1);
            cell2 = row.insertCell(2);
            cell3 = row.insertCell(3);
            cell0.innerHTML = element.id;
            cell1.innerHTML = element.titulo;
            cell2.innerHTML = element.precio
            var img = document.createElement('img');
            img.src = element.url
            img.style.maxHeight = "90px"
            cell3.appendChild(img);
        });

    }

})


miform = document.getElementById('miform')

miform.addEventListener('submit', (e) => {
    
    titulo_element = document.getElementById("titulo")
    precio_element = document.getElementById("precio")
    url_element = document.getElementById("url")

    // on form submission, prevent default
    e.preventDefault();
    let titulo = miform.title.value
    let precio = miform.price.value
    let url = miform.url.value
    let producto = {
        "titulo": titulo,
        "precio": precio,
        "url": url
    }

    socket.emit("nuevo producto", producto)
    console.log("enviando")
    titulo_element.value =""
    precio_element.value =""
    url_element.value =""

})


socket.on("nuevoProducto", (data) => {
    console.log("nuevo producto")
    mitabla = document.getElementById('mitabla')
    id +=1 
    if (mitabla) {
        row = mitabla.insertRow(1);
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell0.innerHTML = id
        cell1.innerHTML = data.titulo;
        cell2.innerHTML = data.precio;
        var img = document.createElement('img');
        img.src = data.url
        img.style.maxHeight = "90px"
        cell3.appendChild(img);
    };

})