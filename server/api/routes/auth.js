const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth')

module.exports = () => {
    // * register
    router.post('/register-prof', AuthController.registerProfessor)
    router.post('/register-parent', AuthController.registerParent)
    // * login
    router.post('/login', AuthController.login)
    // * google auth
    router.post('/google', AuthController.googleAuth)

    return router;
}