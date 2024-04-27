const mongoose = require('mongoose')

const avisSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    enseignantId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Avis = mongoose.model('avis', avisSchema);

module.exports = Avis;