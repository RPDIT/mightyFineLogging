import mongoose from 'mongoose';
import impoundmentSchema from './impoundment.js'

const lumberjackSchema = new mongoose.Schema({
    email_address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
        length: 6
    },
    impoundment: impoundmentSchema,
    created: {
        type: Date,
        required: true, 
        default: Date.now(),
    },
    edited: {
        type: Date, 
        required: true, 
        default: Date.now(),
    }
})

const Lumberjack = mongoose.model('Lumberjacks', lumberjackSchema);

export default Lumberjack;