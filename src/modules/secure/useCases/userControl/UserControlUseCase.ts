import { IRolesRepository } from 'modules/secure/repository/IRolesRepository';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class UserControlUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute(user_id: string, roles_id: string[]): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found', 'user.notfound', 404);
        }

        const roles = await this.rolesRepository.findByIds(roles_id);

        await this.usersRepository.addRoles(user.id, roles);
    }
}

export { UserControlUseCase };
