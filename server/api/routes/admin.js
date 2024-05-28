const express = require('express')
const router = express.Router()
const AdminController = require("../controllers/admin")
const checkLogin = require('../middlewares/checkLogin')
const checkAdmin = require('../middlewares/checkAdmin')

module.exports = () => {
    // get teachers
    router.get('/enseignants', checkLogin, checkAdmin, AdminController.getEnseignants)
    // get parents
    router.get('/parents', checkLogin, checkAdmin, AdminController.getParents)
    // toggle activate account status
    router.put("/active/:id", checkLogin, checkAdmin, AdminController.toggleActive)
    // delete user account
    router.delete('/delete/:id', checkLogin, checkAdmin, AdminController.deleteUser)
    return router;
}