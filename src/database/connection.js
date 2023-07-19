const mongoose = require('mongoose')
const { db } = require('../config')

const connection = mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`)
.then(()=>{
    console.log('Conexión exitosa')
}).catch(()=>{
    console.log('Error al conectarse')
})

module.exports = connection