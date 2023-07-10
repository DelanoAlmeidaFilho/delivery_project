import { Router } from 'express';
import {
    authenticateValidation,
    refreshValidation,
} from '../validators/authenticateValidations';
import { AuthenticateUserController } from 'modules/secure/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from 'modules/secure/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

authenticateRoutes.post(
    '/session',
    authenticateValidation,
    AuthenticateUserController.handle,
);

authenticateRoutes.post(
    '/refresh-token',
    refreshValidation,
    RefreshTokenController.handle,
);

export { authenticateRoutes };
