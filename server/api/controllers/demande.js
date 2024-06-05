const Demande = require('../models/Demande')

exports.sendDemande = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).send({ message: "all inputs required" })
        if (req.user.user_type !== 'parent') return res.status(403).send({ message: 'only parent are able send demande' })
        const demande = new Demande({
            parentId: req.user.user_id,
            enseignantId: req.params.enseignantId,
            message
        })
        const nouvDem = await demande.save()
        res.status(200).send({ message: "demande envoi avec succes", data: nouvDem })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}

exports.refuseDemande = async (req, res) => {
    try {
        const { id } = req.params;
        await Demande.findByIdAndUpdate(id, { checked: true, acceptee: false });
        res.status(200).send({ message: 'demande supprimer' })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}
exports.acceptDemande = async (req, res) => {
    try {
        const { id } = req.params;
        await Demande.findByIdAndUpdate(id, { checked: true, acceptee: true });
        res.status(200).send({ message: 'demande modifiee' })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}
exports.deleteDemande = async (req, res) => {
    try {
        const { id } = req.params;
        await Demande.findByIdAndDelete(id);
        res.status(200).send({ message: 'demande modifiee' })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}

exports.getEnseignantDemandes = async (req, res) => {
    try {
        if (req.user.user_type !== "enseignant") return res.status(403).send({ message: "only teachers access this function" })
        const demandes = await Demande.find({ enseignantId: req.user.user_id })
        res.status(200).send({ message: "demandes sent with success", data: demandes })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}
exports.getParentDemandes = async (req, res) => {
    try {
        if (req.user.user_type !== "parent") return res.status(403).send({ message: "only parents access this function" })
        const demandes = await Demande.find({ parentId: req.user.user_id })
        res.status(200).send({ message: "demandes sent with success", data: demandes })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}