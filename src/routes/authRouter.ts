import { AuthController } from '@controller/AuthController';
import { AuthData } from '@data/AuthData';
import { Authenticator } from '@services/Authenticator';
import { Github } from '@services/Github';
import { IdGenerator } from '@services/IdGenerator';
import express from 'express';
import { AuthBusiness } from 'src/business /AuthBusiness';

export const authRouter = express.Router();
const authBusiness = new AuthBusiness(new AuthData(), new Github(), new IdGenerator(), new Authenticator());
const authController = new AuthController(authBusiness);

authRouter.post('/signin', authController.signin);
