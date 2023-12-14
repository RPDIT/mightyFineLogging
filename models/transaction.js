import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: [true, 'You need to note who the transaction was with.'],
    },
    DOT: {
        type: Date,
        required: [true, 'The date of the transaction is required for documentation.'],
        default: Date.now()
    },
    transType: {
        type: String,
        required: [true, 'The type of transaction will help us understand why it occurred.']
    },
    dolValue: {
        type: Number, 
        rquired: [true, 'The value of the transaction is required.'], 
        default: 0
    },
    created: {
        type: Date,
        required: true, 
        default: Date.now()
    },
    owner: {
        type: String,
        required: true
    },
    purpose: {
        type: String, 
        required: false
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;