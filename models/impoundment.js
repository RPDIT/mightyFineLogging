import mongoose from 'mongoose';
import transactionSchema from './transaction.js'

const impoundmentSchema = new mongoose.Schema({
    running_total : {
        type: Number,
        required: false,
    },
    income: [{transactionSchema}],
    monthly_expenses: [{transactionSchema}],
    expenditure: [{transactionSchema}],
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