import express from 'express';
import { register, login, checkEmail } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/checkEmail', checkEmail);

export default authRouter;
