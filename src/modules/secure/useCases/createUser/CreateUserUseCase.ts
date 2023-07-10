import { AppError } from 'shared/error/AppError';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRequest } from 'modules/secure/DTOs/IUserRequest';
import { hash } from 'bcryptjs';
import { resolve } from 'path';
import { IUserTokensRepository } from 'modules/secure/repository/IUserTokensRepository';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from 'shared/container/providers/MailProvider/IMailProvider';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
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

        const user = await this.usersRepository.create({
            name,
            email,
            password: await hash(password, 8),
            phone_number,
            address,
        });

        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'views',
            'emails',
            'verify_email.hbs',
        );

        const expires_in = this.dateProvider.addHours(3);

        const token = await this.userTokensRepository.generate(
            user.id,
            expires_in,
        );

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            'Confirmação de conta',
            variables,
            templatePath,
        );
    }
}

export { CreateUserUseCase };
