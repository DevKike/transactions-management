import { inject, injectable } from 'inversify';
import { IRouterManager } from '../interfaces/IRouterManager';
import { TYPES } from '../../inversify/types/types';
import { Application } from 'express';
import { IRouterModule } from '../interfaces/IRouterModule';

@injectable()
export class RouterManager implements IRouterManager {
  constructor(
    @inject(TYPES.UserRouter)
    private readonly _userRouter: IRouterModule,
    @inject(TYPES.CreditCardRouter)
    private readonly _creditCardRouter: IRouterModule
  ) {}

  manageRoutes(app: Application): void {
    app.use('/api/user', this._userRouter.getRouter());
    app.use('/api/credit-card', this._creditCardRouter.getRouter());
  }
}
