const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const socket = require('socket.io')

const connection = require('./database/connection')

app.get('/', (req, res)=>{
    res.render('index')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(morgan('dev'))


const server = require('http').createServer(app)
const io = socket(server)
require('./socket')(io)

server.listen(3000, ()=>{
    console.log('Aplicación con express ejecutandose en el puerto 3000')
})

module.exports = app