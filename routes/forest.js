import express from 'express';
import path from 'path';
import sessionController from '../controllers/sessionController.js';



const routes = new express.Router();

routes.get('/', sessionController.sessionList);
routes.get('/forest/:id', sessionController.findSession);
routes.get('/creation', sessionController.newSession);
routes.get('/forest', sessionController.availableSessions);
routes.get('/deforested', sessionController.unavailableSessions);
routes.post('/forest/:id', sessionController.updateSessionUser);
routes.get('/deforest/:id', sessionController.clearSession);
routes.get('/test/:id', sessionController.testingSession);
routes.get('/clear/:id', sessionController.clearSession);




export default routes;
