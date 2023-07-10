import { client } from 'shared/prisma';
import { IUserTokensRepository } from '../../IUserTokensRepository';
import { UserTokens } from '@prisma/client';

class UserTokensRepository implements IUserTokensRepository {
    async generate(user_id: string, expires_in: number): Promise<string> {
        const { token } = await client.userTokens.create({
            data: {
                user_id,
                expires_in,
            },
        });

        return token;
    }

    async findToken(token: string): Promise<UserTokens> {
        return await client.userTokens.findFirst({
            where: { token },
        });
    }

    async deleteToken(token: string): Promise<void> {
        await client.userTokens.delete({
            where: { token },
        });
    }
}

export { UserTokensRepository };
