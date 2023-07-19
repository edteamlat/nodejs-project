const UserAuth = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
    
    constructor(){}

    async register(data){
        data.password = bcrypt.hashSync(data.password, 10)
        const userAuth = new UserAuth(data)
        return await userAuth.save()
    }

    async filterByEmail(email){
        const userAuth = await UserAuth.findOne({email})
        return userAuth
    }

    generateToken(payload){
        const token = jwt.sign(payload, 'secret-key')
        return token
    }
}

module.exports = AuthService