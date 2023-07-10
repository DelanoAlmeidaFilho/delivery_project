import { IUserTokensRepository } from 'modules/secure/repository/IUserTokensRepository';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { resolve } from 'path';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from 'shared/container/providers/MailProvider/IMailProvider';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class VerifyEmailUseCase {
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

    async execute(token: string): Promise<void> {
        const tokenVerify = await this.userTokensRepository.findToken(token);

        if (!tokenVerify) {
            throw new AppError('token invalid', 'token.invalid', 401);
        }

        const user = await this.usersRepository.findById(tokenVerify.user_id);

        if (!user) {
            throw new AppError('user not found', 'user.notfound', 404);
        }

        const verifyTokenExpired = this.dateProvider.isAfter(
            tokenVerify.expires_in,
        );

        if (verifyTokenExpired) {
            await this.userTokensRepository.deleteToken(token);

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

            const new_token = await this.userTokensRepository.generate(
                user.id,
                expires_in,
            );

            const variables = {
                name: user.name,
                link: `${process.env.FORGOT_MAIL_URL}${new_token}`,
            };

            await this.mailProvider.sendMail(
                user.email,
                'Confirmação de conta',
                variables,
                templatePath,
            );

            throw new AppError('token expired', 'token.invalid', 401);
        }

        await this.usersRepository.update({
            id: user.id,
            data: { confirmation_email: true },
        });

        await this.userTokensRepository.deleteToken(token);
    }
}

export { VerifyEmailUseCase };
