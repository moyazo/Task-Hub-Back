import { Router } from 'express';
import { signoutController,signinController, signupController } from '../controllers/auth.controller';


const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);
authRouter.post('/signout', signoutController);

export default authRouter;