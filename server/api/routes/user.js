const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const checkLogin=require('../middlewares/checkLogin')


module.exports = () => {
    // check if email exists
    router.post("/email", UserController.checkEmail)
    // get user info
    router.get("/:id", UserController.getUser)
    // delete
    router.delete('/:id', checkLogin, UserController.deleteUser)
    return router;
}