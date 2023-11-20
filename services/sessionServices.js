import Session from '../models/session.js';


let Services

async function all_sessions () {
    return await Session.find();
};

async function session_creation () {
    let this_session = new Session 
    this_session.save()
    return this_session;
}

async function sessions_by_status (queryStatus) {
    return await Session.find({active:queryStatus});
}

async function session_by_id (theID) {
    return await Session.findById(theID);
}


export default Services = {all_sessions, session_by_id, sessions_by_status, session_creation};