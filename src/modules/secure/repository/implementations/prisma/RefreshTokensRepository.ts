import { client } from 'shared/prisma';
import { IRefreshTokensRepository } from '../../IRefreshTokensRepository';
import { RefreshToken } from '@prisma/client';
import { ICreateRefreshTokenDTO } from 'modules/secure/DTOs/ICreateRefreshTokenDTO';

class RefreshTokensRepository implements IRefreshTokensRepository {
    async create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
        return await client.refreshToken.create({
            data,
        });
    }

    async findTokenByUserId(user_id: string): Promise<RefreshToken> {
        return await client.refreshToken.findUnique({
            where: { user_id },
        });
    }

    async deleteById(id: string): Promise<void> {
        await client.refreshToken.delete({
            where: {
                id,
            },
        });
    }

    async findByToken(token: string): Promise<RefreshToken> {
        return client.refreshToken.findFirst({
            where: {
                token,
            },
        });
    }
}

export { RefreshTokensRepository };
