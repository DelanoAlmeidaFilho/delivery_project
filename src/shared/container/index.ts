import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { UsersRepository } from 'modules/secure/repository/implementations/prisma/UsersRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
