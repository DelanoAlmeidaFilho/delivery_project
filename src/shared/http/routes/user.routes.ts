import { Router } from 'express';
import { CreateUserController } from 'modules/secure/useCases/createUser/CreateUserControler';
import { createUserValidation } from '../validators/userValidations';
import { verifyValidation } from '../validators/verifyEmailValidations';
import { VerifyEmailController } from 'modules/secure/useCases/verifyEmail/VerifyEmailController';
import { userControlValidation } from '../validators/userControlValidations';
import { UserControlController } from 'modules/secure/useCases/userControl/UserControlController';
import { auth } from '../middlewares/auth';
import { authorization } from '../middlewares/authorization';
import { ProfileController } from 'modules/secure/useCases/profile/ProfileController';

const usersRoutes = Router();

usersRoutes.post('/', createUserValidation, CreateUserController.handle);
usersRoutes.post('/verify', verifyValidation, VerifyEmailController.handle);
usersRoutes.get('/me', auth, ProfileController.handle);
usersRoutes.post(
    '/control',
    userControlValidation,
    auth,
    authorization(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']),
    UserControlController.handle,
);

export { usersRoutes };
