const express = require('express')
const router = express.Router()
const EnseignantController = require('../controllers/enseignant')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // get Professors
    router.get('/', EnseignantController.getProfessors)
    // update
    router.put('/:id', checkLogin, EnseignantController.updateEnseignant)

    return router;
}