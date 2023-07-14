import { client } from 'shared/prisma';
import { IRolesRepository } from '../../IRolesRepository';
import { Role } from '@prisma/client';

class RolesRepository implements IRolesRepository {
    async create(name: string): Promise<void> {
        await client.role.create({
            data: {
                name,
            },
        });
    }

    async findByName(name: string): Promise<Role> {
        return await client.role.findUnique({
            where: { name },
        });
    }

    async findByIds(roleIds: string[]): Promise<Role[]> {
        return await client.role.findMany({
            where: {
                id: {
                    in: roleIds,
                },
            },
        });
    }

    async list(): Promise<Role[]> {
        return await client.role.findMany();
    }
}

export { RolesRepository };
