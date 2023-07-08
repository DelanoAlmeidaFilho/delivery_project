import { AppError } from 'shared/error/AppError';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRequest } from 'modules/secure/DTOs/IUserRequest';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        email,
        name,
        password,
        phone_number,
        address,
    }: IUserRequest): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('User already exists', 'user.exist');
        }

        await this.usersRepository.create({
            name,
            email,
            password: await hash(password, 8),
            phone_number,
            address,
        });
    }
}

export { CreateUserUseCase };
