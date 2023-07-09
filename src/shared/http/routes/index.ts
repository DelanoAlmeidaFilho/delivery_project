import { Router } from 'express';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);

export { routes };
