const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        index: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
        index: true
    },
    billMonth: {
        type: String, // better: YYYY-MM format
        required: true,
        index: true
    },
    billAmount: {
        type: Number,
        required: true
    },
    billStatus: {
        type: String,
        enum: ['Paid', 'Partial', 'Pending'],
        default: 'Pending',
        index: true
    },
    paidAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Bill', billSchema)