import { Router } from 'express';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { auth } from '../middlewares/auth';
import { passwordRoutes } from './password.routes';
import { authorization } from '../middlewares/authorization';

const routes = Router();

routes.get(
    '/',
    auth,
    authorization(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']),
    (req, res) => {
        res.send('teste');
    },
);

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use('/password', passwordRoutes);

export { routes };
