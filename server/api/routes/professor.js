const express = require('express')
const router = express.Router()
const ProfessorController = require('../controllers/professor')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // get Professors
    router.get('/', ProfessorController.getProfessors)
    // update
    router.put('/:id', checkLogin, ProfessorController.updateProfessor)
    // delete
    router.delete('/:id', checkLogin, ProfessorController.deleteUser)
    // get
    router.get('/:id', ProfessorController.getUser)

    return router;
}