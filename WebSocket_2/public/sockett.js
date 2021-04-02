const socket = io();



let id

socket.on("data", datas => {
    productos = datas.productos
    id = datas.id
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

socket.on("mensajes_iniciales", datass => {
    if(datass){
        lista_mensajes_div = document.getElementById("mensajes")
        datass.forEach(element => {

                let paragraph_mail = document.createElement('p');
                let paragraph_mensaje = document.createElement('p');
                let paragraph_hora = document.createElement('p');
                paragraph_hora.innerHTML = `${element.hora}`
                paragraph_mensaje.innerHTML = `${element.mensaje}`
                paragraph_mail.style.fontWeight = "bold"
                paragraph_hora.style.color ="brown"
                paragraph_mail.style.color = "blue"
                paragraph_mensaje.style.color = "green"
                paragraph_mensaje.style.fontStyle = "italic"
                paragraph_mail.innerHTML = `${element.mail}`
                lista_mensajes_div.appendChild(paragraph_mail)
                lista_mensajes_div.appendChild(paragraph_hora)
                lista_mensajes_div.appendChild(paragraph_mensaje)
 
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
    titulo_element.value = ""
    precio_element.value = ""
    url_element.value = ""

})


socket.on("nuevoProducto", (data) => {
    console.log("nuevo producto")
    mitabla = document.getElementById('mitabla')
    id += 1
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


/* CHAT GRUPAL */


miChatform = document.getElementById('chat')

miChatform.addEventListener('submit', (e) => {

    let mail = document.getElementById("mail")
    let mensaje = document.getElementById("mensaje")

    // on form submission, prevent default
    e.preventDefault();

    let mensaje_enviado = {
        "mail": mail.value,
        "mensaje": mensaje.value,
        "hora": new Date()

    }

    socket.emit("nuevo mensaje", mensaje_enviado)
    console.log("enviando mensaje")
    console.log(mensaje_enviado)
    mensaje.value = ""

})




socket.on("MensjaNuevo", (data) => {
    console.log("llego mensaje")
    lista_mensajes_div = document.getElementById("mensajes")
    if (data) {
        let paragraph_mail = document.createElement('p');
        let paragraph_mensaje = document.createElement('p');
        let paragraph_hora = document.createElement('p');
        paragraph_hora.innerHTML = `${data.hora}`
        paragraph_mensaje.innerHTML = `${data.mensaje}`
        paragraph_mail.style.fontWeight = "bold"
        paragraph_hora.style.color ="brown"
        paragraph_mail.style.color = "blue"
        paragraph_mensaje.style.color = "green"
        paragraph_mensaje.style.fontStyle = "italic"
        paragraph_mail.innerHTML = `${data.mail}`
        lista_mensajes_div.appendChild(paragraph_mail)
        lista_mensajes_div.appendChild(paragraph_hora)
        lista_mensajes_div.appendChild(paragraph_mensaje)
    };

})