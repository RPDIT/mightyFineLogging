import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
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
        rquired: true
    },
    created: {
        type: Date,
        required: true, 
        default: Date.now()
    }
})

export default transactionSchema;