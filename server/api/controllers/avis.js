const Avis = require('../models/Avis')
const Enseignant = require('../models/Enseignant')

exports.addComment = async (req, res) => {
    try {
        
        if (req.user.user_type !== 'parent') return res.status(403).send({ message: 'only parent are able to comment' })
        const { comment, rating } = req.body;
        const avis = new Avis({
            parentId: req.user.user_id,
            enseignantId: req.params.enseignantId,
            comment,
            rating
        })
        const avisSauv = await avis.save()
        res.status(200).send({ message: "comment added successfully", data: avisSauv })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}


exports.getComments = async (req, res) => {
    try {
        
        const avis = await Avis.find({ enseignantId: req.params.enseignantId })
        if (avis.length == 0) return res.status(404).send({ message: "this teacher has no comments" })
        res.status(200).send({ message: 'comments of this teacher found', data: avis })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}