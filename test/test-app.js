const {test, describe, it, mock} = require('node:test')
const assert = require('assert')
const request = require('supertest')
const app = require('../src/app')
const UserSevice = require('../src/services/userService')

const userService = new UserSevice()

describe('Initial tests', ()=>{
    it('First test', (t)=>{
        assert.equal(1, 1)
    })
})

describe('Test user routes', ()=>{
    it('should return a 200 status code', async (t)=>{
        const response = await request(app).get('/users')
        assert.strictEqual(response.statusCode, 200)
    })
    it('should return an error on users routes', async (t)=>{
        await it('should return a 404 status code', async (t)=>{
            const response = await request(app).get('/user/878')
            assert.strictEqual(response.statusCode, 404)
        })
        
        await it('should return a 404 status code', async (t)=>{
            const response = await request(app).get('/user/id/878')
            assert.strictEqual(response.statusCode, 404)
        })
    })
})

it('should return a user list', async()=>{
    const getAllUsersMock = mock.fn(()=>{
        return [{id: 1, name: "Pablo", lastname: "España", phone: "5678", email: "pablo@gmail.com"}]
    })
    mock.method(userService, 'getAll', getAllUsersMock)
    assert.deepStrictEqual(await userService.getAll(), [{id: 1, name: "Pablo", lastname: "España", phone: "5678", email: "pablo@gmail.com"}])
})

it('should return a success response when a user is created', async()=>{
    const createUserMock = mock.fn(()=>{
        return 'Usuario registrado'
    })
    const userMock = mock.fn(()=>{
        return {name: "Pablo", lastname: "España", phone: "5678", email: "pablo@gmail.com"}
    })
    mock.method(userService, 'create', createUserMock)
    assert.deepStrictEqual(await userService.create(userMock()), 'Usuario registrado')
})