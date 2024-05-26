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
    return router;
}