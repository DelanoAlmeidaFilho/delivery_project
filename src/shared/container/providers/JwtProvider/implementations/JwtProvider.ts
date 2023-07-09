import { inject, injectable } from 'tsyringe';
import { IJwtProvider } from '../IJwtProvider';
import { Role, User } from '@prisma/client';
import { IRefreshTokensRepository } from 'modules/secure/repository/IRefreshTokensRepository';
import { IDateProvider } from '../../DateProvider/IDateProvider';
import { sign } from 'jsonwebtoken';

@injectable()
class JwtProvider implements IJwtProvider {
    constructor(
        @inject('RefreshTokensRepository')
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) {}

    generateAccessToken(user: User & { roles: Role[] }): string {
        const roles = user.roles.map(role => role.name);

        return sign(
            { name: user.name, email: user.email, roles },
            process.env.SECRET_ACCESS_TOKEN,
            {
                subject: user.id,
                expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN,
            },
        );
    }

    async generateRefreshToken(user: User): Promise<string> {
        const refreshExists =
            await this.refreshTokensRepository.findTokenByUserId(user.id);

        refreshExists &&
            (await this.refreshTokensRepository.deleteById(refreshExists.id));

        const refresh_token = sign(
            { email: user.email },
            process.env.SECRET_REFRESH_TOKEN,
            {
                subject: user.id,
                expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
            },
        );

        const refresh_token_expires_date = this.dateProvider.addDays(
            parseInt(process.env.EXPIRES_REFRESH_TOKEN_DAYS),
        );

        await this.refreshTokensRepository.create({
            user_id: user.id,
            token: refresh_token,
            expires_in: refresh_token_expires_date,
        });

        return refresh_token;
    }
}

export { JwtProvider };
