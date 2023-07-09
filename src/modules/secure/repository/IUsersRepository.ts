import { Role, User } from '@prisma/client';
import { IUserRequest } from '../DTOs/IUserRequest';
import { IUpdateUser } from '../interfaces/IUpdateUser';

interface IUsersRepository {
    create(data: IUserRequest): Promise<User>;
    findByEmail(email: string): Promise<User & { roles: Role[] }>;
    findById(id: string): Promise<User>;
    update(data: IUpdateUser): Promise<User>;
}

export { IUsersRepository };
