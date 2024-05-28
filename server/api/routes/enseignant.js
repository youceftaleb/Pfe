const express = require('express')
const router = express.Router()
const EnseignantController = require('../controllers/enseignant')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // get Professors
    router.get('/', EnseignantController.getProfessors)
    // update
    router.put('/:id', checkLogin, EnseignantController.updateEnseignant)
    // add cour de soutien
    router.post('/cour', checkLogin, EnseignantController.addCour)
    // delete cour de soutien
    router.delete('/cour/:id', checkLogin, EnseignantController.deleteCour)
    return router;
}