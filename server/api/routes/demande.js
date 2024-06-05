const express = require('express')
const router = express.Router()
const DemandController = require('../controllers/demande')
const checkLogin = require('../middlewares/checkLogin')

module.exports = () => {
    // send demande
    router.post("/:enseignantId", checkLogin, DemandController.sendDemande)
    // all demandes of professor
    router.get("/", checkLogin, DemandController.getEnseignantDemandes)
    // all demandes of parent
    router.get("/parent", checkLogin, DemandController.getParentDemandes)
    // refuse demande
    router.post('/refuse/:id', checkLogin, DemandController.refuseDemande)
    // accept demande
    router.post('/accept/:id', checkLogin, DemandController.acceptDemande)
    // delete demande
    router.delete('/:id', checkLogin, DemandController.deleteDemande)

    return router;
}