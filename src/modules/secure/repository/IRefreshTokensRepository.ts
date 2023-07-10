import { RefreshTokens } from '@prisma/client';
import { ICreateRefreshTokenDTO } from '../interfaces/ICreateRefreshTokenDTO';

interface IRefreshTokensRepository {
    create({
        expires_in,
        token,
        user_id,
    }: ICreateRefreshTokenDTO): Promise<RefreshTokens>;

    findTokenByUserId(user_id: string): Promise<RefreshTokens>;

    deleteById(id: string): Promise<void>;

    findByTokenAndUserId(
        user_id: string,
        token: string,
    ): Promise<RefreshTokens>;
}

export { IRefreshTokensRepository };
