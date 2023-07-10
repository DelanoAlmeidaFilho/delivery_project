import { UserTokens } from '@prisma/client';

interface IUserTokensRepository {
    generate(user_id: string, expires_in: number): Promise<string>;
    findToken(token: string): Promise<UserTokens>;
    deleteToken(token: string): Promise<void>;
}

export { IUserTokensRepository };
