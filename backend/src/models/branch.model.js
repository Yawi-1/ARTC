const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        unique: true
    },
    address: String,
    contact: String
}, { timestamps: true })

module.exports = mongoose.model('Branch', branchSchema)