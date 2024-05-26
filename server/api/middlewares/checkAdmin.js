const verifyAdmin = (req, res, next) => {
    try {
        if (req.user.user_type !== "admin") return res.status(403).send({ message: "Not Admin" });
    } catch (err) {
        return res.status(401).send({ message: "Not Admin" });
    }
    return next();
};

module.exports = verifyAdmin;