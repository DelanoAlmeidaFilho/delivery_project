import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repository/IUsersRepository';
import { IUserTokensRepository } from '../../repository/IUserTokensRepository';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from 'shared/container/providers/MailProvider/IMailProvider';
import { resolve } from 'path';

@injectable()
class SendForgotPasswordEmailUseCase {
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

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found', 'user.notfound', 404);
        }

        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'views',
            'emails',
            'forgot_password.hbs',
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
            'Recuperação de Senha',
            variables,
            templatePath,
        );
    }
}

export { SendForgotPasswordEmailUseCase };
