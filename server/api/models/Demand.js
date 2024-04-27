const mongoose = require('mongoose')

const demandSchema = new mongoose.Schema({
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
        default: ""
    },
    checked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Demand = mongoose.model('demands', demandSchema);

module.exports = Demand;