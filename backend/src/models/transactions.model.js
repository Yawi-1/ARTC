const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min:0
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    remarks: String
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)