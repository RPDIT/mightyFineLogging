// authentication routes 
// intended to intake hashed userdata
// validate that this is the correct data 
// return validation status and userId

import express from 'express';
import lumberController from '../controllers/lumberjackController.js';


const router = express.Router();


router.get('/',lumberController.user_list);
// router.get('/:id', lumberController.find_user)
router.post('/', lumberController.create_user);
router.post('/login', lumberController.find_user);

export default router;

