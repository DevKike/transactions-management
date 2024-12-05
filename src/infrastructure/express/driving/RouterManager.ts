import { inject, injectable } from 'inversify';
import { IRouterManager } from '../interfaces/IRouterManager';
import { TYPES } from '../../inversify/types/types';
import { Application } from 'express';
import { IRouterModule } from '../interfaces/IRouterModule';

@injectable()
export class RouterManager implements IRouterManager {
  constructor(
    @inject(TYPES.UserRouter) private readonly _userRouter: IRouterModule
  ) {}

  manageRoutes(app: Application): void {
    app.use('/api/user', this._userRouter.getRouter());
  }
}
