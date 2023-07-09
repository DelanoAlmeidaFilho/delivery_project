import { RefreshToken } from '@prisma/client';
import { ICreateRefreshTokenDTO } from '../DTOs/ICreateRefreshTokenDTO';

interface IRefreshTokensRepository {
    create({
        expires_in,
        token,
        user_id,
    }: ICreateRefreshTokenDTO): Promise<RefreshToken>;

    findTokenByUserId(user_id: string): Promise<RefreshToken>;

    deleteById(id: string): Promise<void>;

    findByToken(token: string): Promise<RefreshToken>;
}

export { IRefreshTokensRepository };
