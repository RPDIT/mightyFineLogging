import mongoose from 'mongoose';
import impoundmentSchema from './impoundment.js'
import isEmail from 'validator/lib/isEmail.js'

const lumberjackSchema = new mongoose.Schema({
    email_address: {
        type: String,
        lowercase: true,
        validate: [isEmail, 'invalid email'],
        required: true,
    },
    password: {
        type: String,
        required: true, 
        minLength: [6, 'password is too short']
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