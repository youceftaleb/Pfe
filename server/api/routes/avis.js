const express = require('express')
const router = express.Router()
const Aviscontroller = require('../controllers/avis')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // * add a comment
    router.post('/:enseignantId', checkLogin, Aviscontroller.addComment)
    // * get comment of enseignant
    router.get('/:enseignantId', Aviscontroller.getComments)
    return router;
}