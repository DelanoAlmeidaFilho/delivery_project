import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUseCase } from './ProfileUseCase';

class ProfileController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const user_id = req.userId;

        const profileUseCase = container.resolve(ProfileUseCase);

        const user = await profileUseCase.execute(user_id);

        return res.status(201).json(user);
    }
}

export { ProfileController };
