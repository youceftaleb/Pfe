const Enseignant = require('../models/Enseignant')
const Parent = require('../models/Parent')

exports.updateEnseignant = async (req, res) => {
    try {
        if (req.user.user_type === "parent") return res.status(403).send({ message: "You are not a teacher" })
        if (req.params.id === req.user.user_id) {
            const user = await Enseignant.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                useFindAndModify: false,
            });
            const { password, ...userWithoutPassword } = user._doc;
            res.status(200).json({ message: "User updated", data: userWithoutPassword });
        } else {
            return res.send({ message: "you can't update this user" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}

exports.getProfessors = async (req, res) => {
    try {
        let teachers = await Enseignant.find();//TODO: add queries + limit teachers whose accounts has not been activated yet
        teachers = teachers.map(obj => {
            const { password, ...user } = obj._doc;
            return user
        })
        res.status(200).send({ message: 'found professors successfully', data: teachers })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}



exports.addCour = async (req, res) => {
    try {
        const { description, prix } = req.body;
        if (!description && !prix) return res.status(400).send({ message: 'all inputs are required' })
        await Enseignant.findByIdAndUpdate(req.user.user_id, { $addToSet: { cours: { description, prix } } })
        res.status(200).send({ message: 'cour ajouter avec success' })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.deleteCour = async (req, res) => {
    try {
        const { id } = req.params;
        await Enseignant.findByIdAndUpdate(req.user.user_id, { $pull: { cour: { _id: id } } })
        res.status(200).send({ message: 'cour supprimer avec success' })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
