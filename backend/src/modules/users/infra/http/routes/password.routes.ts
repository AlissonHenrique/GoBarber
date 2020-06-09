import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import ForgotPassordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassordController = new ForgotPassordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassordController.create);
passwordRouter.post('/reset', resetPasswordController.create);
export default passwordRouter;
