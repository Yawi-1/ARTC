const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String, 
  },
  remarks: String
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)