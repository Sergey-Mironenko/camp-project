import { Router } from 'express';
import userController from '@/controllers/user.controller';
import middlewares from '../../middlewares/middlewares';
import authMiddlewares from '@/middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  middlewares.tryCatch.bind(middlewares),
  middlewares.validator.bind(middlewares, { name: 'string', email: 'string', password: 'string' }),
  userController.createUser.bind(userController),
);

userRouter.get(
  '/activate/:activationToken',
  middlewares.tryCatch.bind(middlewares),
  userController.activateUser.bind(userController),
);

userRouter.post(
  '/login',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.validator.bind(middlewares, { email: 'string', password: 'string' }),
  userController.verifyUser.bind(userController),
);

userRouter.post(
  '/verify',
  middlewares.tryCatch.bind(middlewares),
  middlewares.validator.bind(middlewares, { email: 'string' }),
  userController.verifyUser.bind(userController),
);

userRouter.get(
  '/reset/:verificationToken',
  middlewares.tryCatch.bind(middlewares),
  userController.resetPassword.bind(userController),
);

userRouter.post(
  '/update',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.isExist.bind(middlewares),
  middlewares.validator.bind(middlewares, {name: 'string', email: 'string', password: 'string'}),
  userController.verifyUser.bind(userController),
);

export default userRouter;
