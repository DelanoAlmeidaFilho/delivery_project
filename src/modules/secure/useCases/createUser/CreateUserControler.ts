import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { email, name, password, phone_number, address } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            email,
            name,
            password,
            phone_number,
            address,
        });

        return res.status(201).json();
    }
}

export { CreateUserController };
