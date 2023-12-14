// import Session from "../models/session.js"; 
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import expressAsyncHandler from "express-async-handler";
import sessionUtils from '../utils/session.js';
import SessionServices from '../services/session.js';
import { query } from 'express';
let sessionList, findSession, newSession, randomSessionGenerator, sessionTimeout, updateSessionUser, sessionByStatus, clearSession, testingSession;
let session_funcs,  availableSessions, unavailableSessions;

sessionList = expressAsyncHandler(async(req,res,next) => { // tested 
    res.json(await SessionServices.all_sessions());
});

findSession = expressAsyncHandler(async(req,res,next) => { // tested
    let query_id = req.params.id
    try {
        res.send(await SessionServices.session_by_id(query_id));
    } catch (err){
        res.status(err).send(" Error!");
    };
})

newSession = expressAsyncHandler(async(req,res,next) => { // tested
    let created_session = await SessionServices.session_creation();
    try {
        res.send(created_session);
    } catch (error) {
        res.send(error);
    };
})

clearSession = expressAsyncHandler(async(req,res,next) => { // tested
    let dirty_session = await SessionServices.session_by_id(req.params.id);
    let clean_session = await sessionUtils.sessionReset(dirty_session);
    try {
        await clean_session.save()
        res.send(clean_session);
    } catch (error) {
        res.send(error);
    };
});

availableSessions =  expressAsyncHandler(async(req,res,next) => { // tested
    try {
        let currently_closed = await SessionServices.sessions_by_status(false);
        res.json(currently_closed);
    } catch (error) {
        res.send(error);
    };
});

unavailableSessions =  expressAsyncHandler(async(req,res,next) => { // tested 
    try {
        let currently_open = await SessionServices.sessions_by_status(true);
        res.send(currently_open);
    } catch (error) {
        res.send(error);
    };
});

testingSession = expressAsyncHandler(async(req,res,next) => { // tested 
    let query_id, untested_session, tested_session;
    query_id = req.params.id;
    try {
        untested_session = await SessionServices.session_by_id(query_id);
        tested_session = sessionUtils.sessionTesting(untested_session);
        await tested_session.save();
        res.send(tested_session);
    } catch (error) {
        res.send(error);
    };
});

randomSessionGenerator = expressAsyncHandler(async(req,res,next) => {
    let random, session_count, the_result, available_array
    try {
        available_array = await SessionServices.sessions_by_status(false);
        the_result = await sessionUtils.findRandom(available_array);
        await single_result.save()
        res.send(single_result);
    } catch (err) {
        res.sendStatus(err).send(" Error!");
    }
});

updateSessionUser = expressAsyncHandler(async(req,res,next) => { // pull session from param ID, check for what has been edited 
    let client_info, db_results, active_status, query_id, current_session;
    query_id = req.params.id;
    client_info = {
        email_address: req.body.email,
        password: req.body.password
    };
     // options are clientuser, db results, active status, and edited date
    try {
        current_session = await Session.findById(query_id);
        console.log(current_session);
        if (req.body.purpose == "c_info") {
            console.log('found my purpose')
            current_session.clientUser = client_info;
            current_session.active = true;
            current_session.edited = Date.now();
            setTimeout(current_session.sessionTimeout, 20000, current_session);
            await current_session.save();
            res.send(current_session);}
    } catch (err){
        res.status(err);
    };
});

export default session_funcs = {sessionList, findSession, newSession, randomSessionGenerator, unavailableSessions, availableSessions, updateSessionUser, clearSession, testingSession};
