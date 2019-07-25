import express from 'express';
import AuthController from './authController';
import Validator from '../../middlewares/validator';

const authRouter = express.Router();

authRouter.post(
  '/auth/signup',
  Validator.validateUserBody,
  Validator.checkUserExists,
  AuthController.signUpUser,
);

authRouter.post(
  '/auth/signin',
  AuthController.signInUser,
);

export default authRouter;
