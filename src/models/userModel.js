const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    phone: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User