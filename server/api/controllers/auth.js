const Admin = require('../models/Administrateur')
const Parent = require('../models/Parent')
const Enseignant = require('../models/Enseignant')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerEnseignant = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, userName, experience, modules, disponibilite, CV, identite, adresse } = req.body;
        // ! form validation server side
        if (
            !(email && password && userName && experience && disponibilite && modules && CV && identite && adresse) //TODO: handle CV file
        ) {
            return res.status(400).send({ message: "tout champs requis" });
        }
        // ? does user already exist ?
        if (await Enseignant.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(409).send({ message: "Utilisateur exist deja" });
        }

        // ! Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // * saving our new created instance
        const savedUser = await Enseignant.create({
            ...req.body, //TODO: modify to handle CV
            password: encryptedPassword
        });
        res.status(201).json({ message: "Utilisateur creer avec succes", data: savedUser })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Somethig went wrong' });
    }
}

exports.registerParent = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        // ! form validation server side
        if (!(email && password && userName)) {
            return res.status(400).send({ message: "tout champs requis" });
        }

        // ? does user already exist ?
        if (await Enseignant.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(409).send({ message: "Utilisateur exist deja" });
        }

        // ! Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // * saving our new created instance
        let savedUser = await Parent.create({
            email,
            password: encryptedPassword,
            userName,
        });
        res.status(201).json({ message: "Utilisateur creer avec succes", data: savedUser })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Somethig went wrong' });
    }
}

// login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate user input
        if (!(email && password)) {
            return res.status(400).send({ message: "tout champs requis" });
        }
        // check if user exists in our database
        let user = await Admin.findOne({ email });
        if (!user) {
            user = await Parent.findOne({ email });
            if (!user) {
                user = await Enseignant.findOne({ email });
                if (!user) return res.status(404).send({ message: "Utilisateur n'existe pas svp creer un compte" })
                if (user?.activated === false) {
                    return res.status(403).send({ message: "Ce compte n'est pas encore activer par l'Admin" })
                }
            }
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            // create a token
            const type = user?.experience ? "enseignant" : user?.userName ? "parent" : "admin"
            const token = jwt.sign(
                { user_id: user._id, user_type: type },
                process.env.TOKEN_KEY
            );
            const { password, ...userWithoutPassword } = user._doc;

            // response
            res.status(200).send({ message: 'logged in successfully', data: userWithoutPassword, token, type })
        } else {
            res.status(409).send({ message: "email ou mot de passe incorrecte" });
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }
};

