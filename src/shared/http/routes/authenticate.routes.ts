import { Router } from 'express';
import { authenticateValidation } from '../validators/authenticateValidations';
import { AuthenticateUserController } from 'modules/secure/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

authenticateRoutes.post(
    '/session',
    authenticateValidation,
    AuthenticateUserController.handle,
);

export { authenticateRoutes };
