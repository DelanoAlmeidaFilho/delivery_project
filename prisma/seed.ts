import { hash } from 'bcryptjs';
import { client } from '../src/shared/prisma';

// npx prisma db seed
async function main() {
    const role_super_admin = await client.role.create({
        data: { name: 'ROLE_SUPER_ADMIN' },
    });

    await client.user.create({
        data: {
            name: 'delano',
            email: process.env.ADMIN_EMAIL,
            password: await hash(process.env.ADMIN_PASS, 8),
            phone_number: '98984154610',
            confirmation_email: true,
            address: {
                create: {
                    road: '20',
                    neighborhood: 'R. PINHEIROS',
                    cep: '65000',
                    number: '4',
                    complement: 'proximo ao castelo de davi',
                },
            },
            roles: {
                connect: {
                    id: role_super_admin.id,
                },
            },
        },
    });

    await client.role.create({
        data: { name: 'ROLE_ADMIN' },
    });

    await client.role.create({
        data: { name: 'ROLE_EMPLOYEE' },
    });
}

main();
