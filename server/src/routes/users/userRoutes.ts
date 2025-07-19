import express from 'express';
import cors from 'cors';
import {createUser} from '../../controllers/userController';

const router = express.Router();

router.use(cors());

router.post('/create', createUser);

export default router;