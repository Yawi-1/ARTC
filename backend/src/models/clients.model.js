const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: String,
    contact: String,
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    clientCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId, // ✅ better than string
        ref: 'Branch',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);