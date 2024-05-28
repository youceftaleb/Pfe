const Enseignant = require('../models/Enseignant')
const Parent = require('../models/Parent')

exports.getEnseignants = async (req, res) => {
    try {
        let teachers = await Enseignant.find();
        teachers = teachers.map(obj => {
            const { password, ...user } = obj._doc;
            return user
        })
        res.status(200).send({ message: 'success', data: teachers })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.getParents = async (req, res) => {
    try {
        let parents = await Parent.find();
        parents = parents.map(obj => {
            const { password, ...user } = obj._doc;
            return user
        })
        res.status(200).send({ message: 'success', data: parents })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.toggleActive = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await Enseignant.findById(id)
        if (!user) return res.status(404).send({ message: "utilisateur n'existe pas" })
        await Enseignant.findByIdAndUpdate(id, { activated: !user.activated })
        res.status(201).send({ message: `${user.activated ? "compte desactiver" : "compte activer"} avec success` })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Enseignant.findByIdAndDelete(id);
        if (!user) await Parent.findByIdAndDelete(id);
        if (!user) return res.status(404).send({ message: "utilisateur n'existe pas" })
        res.status(200).send({ message: 'Utilisateur supprimmer avec success' })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}