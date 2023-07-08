import { Router } from 'express';
import { CreateUserController } from 'modules/secure/useCases/createUser/CreateUserControler';
import { createUserValidation } from '../validators/userValidations';

const usersRoutes = Router();

usersRoutes.post('/', createUserValidation, CreateUserController.handle);

export { usersRoutes };
