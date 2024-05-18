const Parent = require('../models/Parent')
const Enseignant = require('../models/Enseignant')

exports.getUser = async (req, res) => {
    try {
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

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (await Enseignant.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(200).send({ message: "Email exists" });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user.user_id) {
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