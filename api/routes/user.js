import express from 'express';
import { createUser, getUser } from '../controller/user.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/get', getUser);

export default router;