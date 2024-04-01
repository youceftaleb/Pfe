const Parent = require('../models/Parent')
const Professor = require('../models/Professor')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerProfessor = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        // ! form validation server side
        if (
            !(email && password && userName)
        ) {
            return res.status(400).send({ message: "all input are required :email, password, userName" });
        }

        // ? does user already exist ?
        if (await Professor.findOne({ email }) || await Parent.findOne({ email })) {
            return res.status(409).send({ message: "User ALeready exists, Please login" });
        }

        // ! Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        // * saving our new created instance
        const savedUser = await Professor.create({
            email,
            password: encryptedPassword,
            userName,
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
        if (
            !(email && password && userName)
        ) {
            return res.status(400).send({
                message: "all input are required {\n\temail\n\tpassword\n\tuserName\n}"
            });
        }

        // ? does user already exist ?
        if (await Professor.findOne({ email }) || await Parent.findOne({ email })) {
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

/// login a user
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
            user = await Professor.findOne({ email });
        }
        if (user?.fromGoogle) return res.status(409).send({ message: "you are signed up with a gmail account please sign in with google" })
        if (user && (await bcrypt.compare(password, user.password))) {
            // create a token
            const token = jwt.sign(
                { user_id: user._id },
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
        if (!user) await Professor.findOne({ email: req.body.email })
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