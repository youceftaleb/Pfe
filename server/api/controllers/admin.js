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

