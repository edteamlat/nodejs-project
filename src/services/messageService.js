const Message = require('../models/messageModel')

class MessageSevice{
    constructor(){}

    async getAll(){
        const messages = await Message.find({})
        return messages
    }

    async create(msg){
        const message = new Message(msg)
        return await message.save()
    }


}

module.exports = MessageSevice