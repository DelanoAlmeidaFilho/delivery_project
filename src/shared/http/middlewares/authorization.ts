import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from 'modules/secure/repository/implementations/prisma/UsersRepository';
import { AppError } from 'shared/error/AppError';
import { container } from 'tsyringe';

export function authorization(rolesRoutes: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req;

        const usersRepository = container.resolve(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 'user.notfound', 404);
        }

        if (!user.is_active) {
            throw new AppError('User not authorized', 'user.unauthorized', 403);
        }

        const roleExists = user.roles.some(role =>
            rolesRoutes.includes(role.name),
        );

        if (!roleExists) {
            throw new AppError('User not authorized', 'user.unauthorized', 403);
        }

        return next();
    };
}
