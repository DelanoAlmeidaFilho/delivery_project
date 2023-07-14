import { User } from '@prisma/client';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(user_id: string): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found', 'user.notfound', 404);
        }

        return user;
    }
}

export { ProfileUseCase };
