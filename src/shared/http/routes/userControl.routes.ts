import { Router } from 'express';
import { userControlValidation } from '../validators/userControlValidations';
import { UserControlController } from 'modules/secure/useCases/userControl/UserControlController';

const userControlRoutes = Router();

userControlRoutes.post(
    '/user-control',
    userControlValidation,
    UserControlController.handle,
);

export { userControlRoutes };
