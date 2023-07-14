import { Router } from 'express';
import { CreateUserController } from 'modules/secure/useCases/createUser/CreateUserControler';
import { createUserValidation } from '../validators/userValidations';
import { verifyValidation } from '../validators/verifyEmailValidations';
import { VerifyEmailController } from 'modules/secure/useCases/verifyEmail/VerifyEmailController';

const usersRoutes = Router();

usersRoutes.post('/', createUserValidation, CreateUserController.handle);
usersRoutes.post('/verify', verifyValidation, VerifyEmailController.handle);

export { usersRoutes };
