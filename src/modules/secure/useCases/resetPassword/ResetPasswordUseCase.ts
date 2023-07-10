import { hash } from 'bcryptjs';
import { IUserTokensRepository } from 'modules/secure/repository/IUserTokensRepository';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) {}

    async execute(token: string, password: string): Promise<void> {
        const userToken = await this.userTokensRepository.findToken(token);

        if (!userToken) {
            throw new AppError('token invalid', 'token.invalid', 401);
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('user not found', 'user.notfound', 404);
        }

        const refreshTokenExpired = this.dateProvider.isAfter(
            userToken.expires_in,
        );

        if (refreshTokenExpired) {
            throw new AppError('token expired', 'token.invalid', 401);
        }

        const passwordUpdate = await hash(password, 8);

        await this.usersRepository.update({
            id: user.id,
            data: { password: passwordUpdate },
        });

        await this.userTokensRepository.deleteToken(token);
    }
}

export { ResetPasswordUseCase };
