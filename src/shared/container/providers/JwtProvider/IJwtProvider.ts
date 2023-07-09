import { Role, User } from '@prisma/client';

interface IJwtProvider {
    generateAccessToken(user: User & { roles: Role[] }): string;
    generateRefreshToken(user: User): Promise<string>;
}

export { IJwtProvider };
