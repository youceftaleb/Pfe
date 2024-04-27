const Parent = require('../models/Parent')
const Enseignant = require('../models/Enseignant')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerEnseignant = async (req, res) => {
    try {
        const { email, password, userName, experience, modules, availability, CV } = req.body;

        // ! form validation server side
        if (
            !(email && password && userName && experience && availability && modules && CV) //TODO: handle CV file
        ) {
            return res.status(400).send({ message: "all input are required" });
        }

        // ? does user already exist ?
        if (await Enseignant.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(409).send({ message: "User ALeready exists, Please login" });
        }

        // ! Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // * saving our new created instance
        const savedUser = await Enseignant.create({
            ...req.body, //TODO: modify to handle CV
            password: encryptedPassword
        });
        res.status(201).json({ message: "User created successfully", data: savedUser })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Somethig went wrong' });
    }
}

exports.registerParent = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        // ! form validation server side
        if (!(email && password && userName)) {
            return res.status(400).send({ message: "all input are required" });
        }

        // ? does user already exist ?
        if (await Enseignant.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(409).send({ message: "User ALeready exists, Please login" });
        }

        // ! Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // * saving our new created instance
        let savedUser = await Parent.create({
            email,
            password: encryptedPassword,
            userName,
        });
        res.status(201).json({ message: "User created successfully", data: savedUser })
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
            return res.status(400).send({ message: "All input are required" });
        }
        // check if user exists in our database
        let user = await Parent.findOne({ email });
        if (!user) {
            user = await Enseignant.findOne({ email });
            if (user && user?.activated === false) {
                return res.status(403).send({ message: "Admin hasn't activated your account yet" })
            }
        }
        if (user?.fromGoogle) return res.status(409).send({ message: "you are signed up with a gmail account please sign in with google" })
        if (user && (await bcrypt.compare(password, user.password))) {
            // create a token
            const token = jwt.sign(
                { user_id: user._id, user_type: user?.experience ? "enseignant" : "parent" },
                process.env.TOKEN_KEY
            );
            const { password, ...userWithoutPassword } = user._doc;

            // response
            res.status(200).send({ message: 'logged in successfully', data: userWithoutPassword, token })
        } else {
            res.status(409).send({ message: "incorrect email or password" });
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        let user = await Parent.findOne({ email: req.body.email });
        if (!user) await Enseignant.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY);
            res.status(200).send({ message: 'logged in successfully', data: user._doc, token })
        } else {
            const newUser = new User({ ...req.body, fromGoogle: true })
            const savedUser = await newUser.save()
            const token = jwt.sign({ user_id: savedUser._id }, process.env.TOKEN_KEY);
            res.status(200).send({ message: 'logged in successfully', data: savedUser._doc, token })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }
}


// getting user account
// todo later
// exports.account = async (req, res) => {
//     if (req.user) {
//         await res.json({ user: req.user });
//     } else {
//         await res.json({ user: null });
//     }
// };