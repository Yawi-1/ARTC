const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    address: String,
    contact: String
}, { timestamps: true })

module.exports = mongoose.model('Branch', branchSchema)