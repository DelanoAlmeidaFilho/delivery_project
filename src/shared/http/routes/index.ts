import { Router } from 'express';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { auth } from '../middlewares/auth';
import { passwordRoutes } from './password.routes';

const routes = Router();

routes.get('/', auth, (req, res) => {
    res.send('teste');
});

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use('/password', passwordRoutes);

export { routes };
