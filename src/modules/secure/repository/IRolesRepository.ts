import { Role } from '@prisma/client';

interface IRolesRepository {
    create(name: string): Promise<void>;
    findByName(name: string): Promise<Role>;
    findByIds(roleIds: string[]): Promise<Role[]>;
    list(): Promise<Role[]>;
}

export { IRolesRepository };
