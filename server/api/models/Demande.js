const mongoose = require('mongoose')

const demandeSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    enseignantId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        default: ""
    },
    checked: {
        type: Boolean,
        default: false
    },
    acceptee: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Demande = mongoose.model('demandes', demandeSchema);

module.exports = Demande;