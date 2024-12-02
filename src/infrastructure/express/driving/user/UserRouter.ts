import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { TYPES } from '../../../inversify/types/types';
import { RegisterUseCase } from '../../../../application/usecases/user/RegisterUseCase';
import { IRouterModule } from '../../interfaces/IRouterModule';

@injectable()
export class UserRouter implements IRouterModule {
  private readonly _userRouter: Router;

  constructor(
    @inject(TYPES.RegisterUseCase)
    private readonly _registerUseCase: RegisterUseCase
  ) {
    this._userRouter = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._userRouter.post('/', async (req, res) => {
      try {
        const user = await this._registerUseCase.execute(req.body);
        res.status(201).json({ message: 'User created successfully', createdUser: user });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error:', error });
      }
    });
  }

  getRouter(): Router {
    return this._userRouter;
  }
}
