const {options}  = require("./DB/options/mariaDB")
const knex = require("knex")(options)

knex.schema.createTable("productos", table =>{
    table.increments("id")
    table.string("nombre")
    table.integer("price")
}).then( ()=> console.log("Tabla Creada"))
.catch((err)=> {console.log(err); throw err})
.finally(()=>{
    knex.destroy()
})