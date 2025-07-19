import express from 'express';
import cors from 'cors';
import {createBug} from './../../controllers/bugController';

const router = express.Router();

router.use(cors());

router.post('/create', createBug);

export default router;