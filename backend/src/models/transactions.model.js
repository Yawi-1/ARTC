const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
        index: true,
        lowercase: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        lowercase:true
    },
    remarks: String,
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)