import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    clientUser : {  // user email and hashed pw, used to query db
        type: Object
    },
    dbResults: { // either confirm match and provide data or deny 
        type: Object,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    edited: {
        type: Date, 
        required: true,
        default: Date.now()
    }
});

const SessionModel = mongoose.model('Sessions', sessionSchema);

export default SessionModel;
