import { Router } from 'express';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { auth } from '../middlewares/auth';

const routes = Router();

routes.get('/', auth, (req, res) => {
    res.send('teste');
});

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);

export { routes };
