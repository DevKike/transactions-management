import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { TYPES } from '../../../inversify/types/types';
import { RegisterUseCase } from '../../../../application/usecases/user/RegisterUseCase';
import { IRouterModule } from '../../interfaces/IRouterModule';
import { ResponseModel } from '../../response/ResponseModel';
import { HttpStatusCode } from '../../../../domain/enums/HttpStatusCode';
import { Message } from '../../../../domain/enums/Message';

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
      await ResponseModel.manageResponse(
        this._registerUseCase.execute(req.body),
        res,
        HttpStatusCode.CREATED,
        Message.CREATED
      );
    });
  }

  getRouter(): Router {
    return this._userRouter;
  }
}
