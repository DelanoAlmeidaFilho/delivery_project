import { IUserRequest } from 'modules/secure/DTOs/IUserRequest';
import { IUsersRepository } from '../../IUsersRepository';
import { client } from 'shared/prisma';
import { Role, User } from '@prisma/client';
import { IUpdateUser } from 'modules/secure/interfaces/IUpdateUser';

class UsersRepository implements IUsersRepository {
    async create({
        email,
        name,
        password,
        phone_number,
        address,
    }: IUserRequest): Promise<User> {
        return await client.user.create({
            data: {
                email,
                name,
                password,
                phone_number,
                address: {
                    create: address,
                },
            },
        });
    }
    async findByEmail(email: string): Promise<User & { roles: Role[] }> {
        return await client.user.findUnique({
            where: { email },
            include: {
                roles: true,
            },
        });
    }

    async findById(id: string): Promise<User & { roles: Role[] }> {
        return await client.user.findUnique({
            where: { id },
            include: {
                roles: true,
            },
        });
    }

    async update({ id, data }: IUpdateUser): Promise<User> {
        return await client.user.update({
            where: { id },
            data,
        });
    }

    async addRoles(user_id: string, roles: Role[]): Promise<void> {
        await client.user.update({
            where: { id: user_id },
            data: {
                roles: {
                    connect: roles.map(role => ({ id: role.id })),
                },
            },
        });
    }
}

export { UsersRepository };
