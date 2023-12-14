import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import forestRoutes from './routes/forest.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import permitRoutes from './routes/permit.js';
import impoundmentRoutes  from './routes/impoundment.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function connectDb(uri){
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri).then(() => {
        console.log('connected');
    }, err => {
        console.log('Error: ', err);
    })};


function loadMiddlewears() {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('combined'));
};

function addRoutes() {
    app.use('/', forestRoutes);
    app.use('/permit', permitRoutes)
    app.use('/the-dam', impoundmentRoutes);
}

function main() {
    loadMiddlewears();
    addRoutes();
    if (process.env.NODE_ENV !== 'test') {
        app.listen(process.env.API_PORT, () => {
            console.log(`server running on http://localhost:${process.env.API_PORT}`);
        connectDb(process.env.API_key);
    })};
    return app;
};


export default main();






/* site structure ideas 
    '/' goes to login/landing page
    client provides login info 
    send post req to '/forest/' session handler
      containing username/hashed pw 
    session handler
      creates the session
        provides data to the '/permit' route for validation
          queries the db for the provided userinfo 
        returns with success or failure 
    returns with session status and user:id
        redirects to '/forest:id' of user if success
*/