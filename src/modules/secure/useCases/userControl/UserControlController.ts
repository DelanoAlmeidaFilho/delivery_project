import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserControlUseCase } from './UserControlUseCase';

class UserControlController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { user_id, roles_id } = req.body;

        const userControlUseCase = container.resolve(UserControlUseCase);

        await userControlUseCase.execute(user_id, roles_id);

        return res.status(204).send();
    }
}

export { UserControlController };
