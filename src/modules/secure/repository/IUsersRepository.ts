import { Role, User } from '@prisma/client';
import { IUserRequest } from '../DTOs/IUserRequest';
import { IUpdateUser } from '../interfaces/IUpdateUser';

interface IUsersRepository {
    create(data: IUserRequest): Promise<User>;
    findByEmail(email: string): Promise<User & { roles: Role[] }>;
    findById(id: string): Promise<User & { roles: Role[] }>;
    update(data: IUpdateUser): Promise<User>;
    addRoles(user_id: string, roles: Role[]): Promise<void>;
}

export { IUsersRepository };
