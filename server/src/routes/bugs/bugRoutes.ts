import express from 'express';
import cors from 'cors';
import {createBug, getBugById, getBugs} from './../../controllers/bugController';

const router = express.Router();

router.use(cors());

router.post('/create', createBug);
router.get('/:id', getBugById);
router.get('/', getBugs);


export default router;