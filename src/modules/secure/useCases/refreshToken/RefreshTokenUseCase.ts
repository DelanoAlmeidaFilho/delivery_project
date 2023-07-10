import { verify } from 'jsonwebtoken';
import { IRefreshTokenResponse } from 'modules/secure/DTOs/IRefreshTokenResponse';
import { IRefreshTokensRepository } from 'modules/secure/repository/IRefreshTokensRepository';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { IJwtProvider } from 'shared/container/providers/JwtProvider/IJwtProvider';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IPayload {
    sub: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('RefreshTokensRepository')
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject('JwtProvider')
        private jwtProvider: IJwtProvider,
    ) {}

    async execute(token: string): Promise<IRefreshTokenResponse> {
        try {
            const { sub: user_id } = verify(
                token,
                process.env.SECRET_REFRESH_TOKEN,
            ) as IPayload;

            const user_refresh_token =
                await this.refreshTokensRepository.findByTokenAndUserId(
                    user_id,
                    token,
                );

            if (!user_refresh_token) {
                throw new AppError('token invalid', 'token.invalid', 401);
            }

            const user = await this.usersRepository.findById(user_id);

            const access_token = this.jwtProvider.generateAccessToken(user);

            const refresh_token = await this.jwtProvider.generateRefreshToken(
                user,
            );
            return {
                access_token,
                refresh_token,
            };
        } catch (error) {
            throw new AppError('token invalid', 'token.invalid', 401);
        }
    }
}

export { RefreshTokenUseCase };
