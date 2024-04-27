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

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user.user_id) {
            //TODO: move this functin somewhere else cause it can delete any user type not just professor (this file is professor.js)
            // check if user exists in our database
            let user = await Parent.findByIdAndDelete(req.params.id);
            if (!user) {
                user = await Enseignant.findByIdAndDelete(req.params.id);
            }
            res.status(200).json({ message: "User deleted successfully", data: user });
        } else {
            return res.send({ message: "you can't delete this user" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}
exports.getUser = async (req, res) => {
    try {
        //TODO: move this functin somewhere else cause it can get any user type not just professor (this file is professor.js)
        let user = await Parent.findById(req.params.id);
        if (!user) {
            user = await Enseignant.findById(req.params.id);
        }
        if (!user) return res.status(404).send({ message: "User not found" });
        const { password, ...userWithoutPassword } = user._doc;
        res.status(200).send({ message: "User found successfully", data: userWithoutPassword })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.getProfessors = async (req, res) => {
    try {
        let teachers = await Enseignant.find();//TODO: add queries
        teachers = teachers.map(obj => {
            const { password, ...user } = obj._doc;
            return user
        })
        res.status(200).send({ message: 'found professors successfully', data: professors })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
