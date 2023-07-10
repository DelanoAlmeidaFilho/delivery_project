import { RefreshTokens } from '@prisma/client';
import { ICreateRefreshTokenDTO } from 'modules/secure/interfaces/ICreateRefreshTokenDTO';
import { client } from 'shared/prisma';
import { IRefreshTokensRepository } from '../../IRefreshTokensRepository';

class RefreshTokensRepository implements IRefreshTokensRepository {
    async create(data: ICreateRefreshTokenDTO): Promise<RefreshTokens> {
        return await client.refreshTokens.create({
            data,
        });
    }

    async findTokenByUserId(user_id: string): Promise<RefreshTokens> {
        return await client.refreshTokens.findUnique({
            where: {
                user_id,
            },
        });
    }

    async deleteById(id: string): Promise<void> {
        await client.refreshTokens.delete({
            where: {
                id,
            },
        });
    }

    async findByTokenAndUserId(
        user_id: string,
        token: string,
    ): Promise<RefreshTokens> {
        return await client.refreshTokens.findFirst({
            where: {
                token,
                user_id,
            },
        });
    }
}

export { RefreshTokensRepository };
