import Lumberjack from '../models/lumberjack.js';
import bcrypt from 'bcrypt';


let Services

async function all_users () {
    return await Lumberjack.find();
};

async function user_creation (email, pw) {
    let this_user = new Lumberjack({
        email_address: email, 
        password: pw
    }) 
    await this_user.save()
    return this_user;
}


async function user_by_id (theID) {
    return await Lumberjack.findById(theID);
}

async function user_by_email (email) {
    return await Lumberjack.find({email_address: email});
}

async function delete_user (id) {
    return await Lumberjack.deleteOne({_id: id});
}


export default Services = {all_users, user_by_id, user_creation, user_by_email, delete_user};