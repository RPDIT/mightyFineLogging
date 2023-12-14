import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: true,
    },
    DOT: {
        type: Date,
        required: true,
        default: Date.now()
    },
    transType: {
        type: String,
        required: true,
    },
    dolValue: {
        type: Number, 
        rquired: true, 
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