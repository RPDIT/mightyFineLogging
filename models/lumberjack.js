import mongoose from 'mongoose';

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
    felled_logs: {
        type: Object
    },
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