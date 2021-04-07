const fs = require('fs')

/* 

borrar: elimina el archivo completamente


 */
class Archivo {
    constructor(nombre_archivo) {
        this.nombre_archivo = nombre_archivo;
    }

    async leer() {
        /* Muestra el array de productos del archivo this.nombre_archivo,
        Si no existe el archivo este es creado */
        await fs.readFile(`./${ this.nombre_archivo}`, 'utf-8', async (error, contenido) => {
            if (error) {
                // Si el archivo no existe, lo creo y devuelvo un array vacío 
                let productos = {
                    productos: []
                }
                fs.writeFileSync(`${ this.nombre_archivo}`, JSON.stringify(productos))
                //Devuelvo el Array vacío
                console.log(`No existe el archivo ${this.nombre_archivo} 😲, entonces lo cramos por vos`)
            } else {
                let productos = JSON.parse(contenido)
                console.log(productos["productos"])

            }
        })

    }
    async gurdar(producto_nuevo) {
        /* guardar: {id: longitud del array productos + 1, ...  }, incopora productos a this.nombre_archivo.txt
         */


        await fs.readFile(`./${this.nombre_archivo}`, 'utf-8', async (error, contenido) => {
            if (error) {
                console.log(error)
            }
            //Devuelvo el Array vacío
            else {

                let nuevo_producto = JSON.parse(JSON.stringify(producto_nuevo))
                let productos_parse = JSON.parse(contenido)
                let cantidad_productos = productos_parse.productos.length
                nuevo_producto.id = cantidad_productos + 1
                productos_parse["productos"].push(nuevo_producto)
                let productos_nuevo = JSON.stringify(productos_parse)
                 await fs.writeFile("./productos.txt", productos_nuevo, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    console.log("guardado!")
                })
            }




        })

    }

    borrar() {
        console.log(`./${this.nombre_archivo}.txt`)
        fs.unlink(`./${this.nombre_archivo}`, (err) => {
            if (err) {
                console.error(err)
                return
            }

        })
    }


}
/*

Arreglar:
- agregar funcion borrar -> borra productos.txt

- Si el archivo productos.txt no está, crearlo

- prpductos sea un objeto en el archivo index.js


*/


(async () => {
    miManager = new Archivo("productos.txt")
    await miManager.leer()
    let producto = {
        title: "nombre",
        price: 15,
        thumbnail: "url"
    }
    //await miManager.gurdar(producto)
    await miManager.borrar()
})()