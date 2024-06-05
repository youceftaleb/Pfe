const express = require('express')
const router = express.Router()
const EnseignantController = require('../controllers/enseignant')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // get Professors
    router.post('/', EnseignantController.getProfessors)
    // ajouter a la liste de disponibilite
    router.post('/disp', checkLogin, EnseignantController.addDisponibilite)
    // supprimer disponibilite
    router.post('/disp/:id',checkLogin,EnseignantController.deleteDisponibilite)
    // update
    router.put('/:id', checkLogin, EnseignantController.updateEnseignant)
    // add cour de soutien
    router.post('/cour', checkLogin, EnseignantController.addCour)
    // delete cour de soutien
    router.delete('/cour/:id', checkLogin, EnseignantController.deleteCour)
    return router;
}