const {options}  = require("./DB/options/SQLite3")
const knex = require("knex")(options)

knex.schema.createTable("carss", table =>{
    table.increments("id")
    table.string("nombre")
    table.integer("price")
}).then( ()=> console.log("Tabla Creada"))
.catch((err)=> {console.log(err); throw err})
.finally(()=>{
    knex.destroy()
})