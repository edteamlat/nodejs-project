const MessageSevice = require('./services/messageService')

const messageService = new MessageSevice()

module.exports = (io) => {
    
    io.on('connection', async (socket)=>{
        console.log("Un nuevo usuario conectado");
        const messages = await messageService.getAll()
        io.emit('all-messages', messages)

        socket.on('writing', (username)=>{
            socket.broadcast.emit('writing', username)
        })

        socket.on('new-message', async (data)=>{
            await messageService.create(data)
            const messages = await messageService.getAll()
            io.emit('all-messages', messages)
        })
    })

    
}