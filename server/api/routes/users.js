const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
// const checkLogin = require('../../middlewares/checkLogin')// TODO

module.exports = () => {
    // update
    router.put('/users/:id', checkLogin, UserController.updateUser)
    // delete
    router.delete('/users/:id', checkLogin, UserController.deleteUser)
    // get
    router.get('/users/:id', UserController.getUser)
    // get Professors
    router.get('/professors')

    return router;
}