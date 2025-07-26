import express from 'express';
import cors from 'cors';
import {createUser, getUserByID, signIn} from '../../controllers/userController';

const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));


router.post('/create', createUser);
router.post('/login', signIn);
router.get('/id/:id', getUserByID);

export default router;