import mongoose from 'mongoose';
import Transaction from './transaction.js'

const impoundmentSchema = new mongoose.Schema({
    running_total : {
        type: Number,
        required: true,
    },
    transactions: {
        type: Array, 
        required: true, 
        default: [],
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    edited: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

export default impoundmentSchema