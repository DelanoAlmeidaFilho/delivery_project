import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { UsersRepository } from 'modules/secure/repository/implementations/prisma/UsersRepository';
import { IRefreshTokensRepository } from 'modules/secure/repository/IRefreshTokensRepository';
import { RefreshTokensRepository } from 'modules/secure/repository/implementations/prisma/RefreshTokensRepository';
import { IUserTokensRepository } from 'modules/secure/repository/IUserTokensRepository';
import { UserTokensRepository } from 'modules/secure/repository/implementations/prisma/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IRefreshTokensRepository>(
    'RefreshTokensRepository',
    RefreshTokensRepository,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);
