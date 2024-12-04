import { inject, injectable } from 'inversify';
import { Response, Router } from 'express';
import { TYPES } from '../../../inversify/types/types';
import { IRouterModule } from '../../interfaces/IRouterModule';
import { ResponseModel } from '../../response/ResponseModel';
import { HttpStatusCode } from '../../../../domain/enums/HttpStatusCode';
import { Message } from '../../../../domain/enums/Message';
import { IRegisterUseCase } from '../../../../domain/interfaces/user/usecases/IRegisterUseCase';
import { ILoginUseCase } from '../../../../domain/interfaces/user/usecases/ILoginUseCase';
import { IRequest } from '../../interfaces/IRequest';
import { authMiddleware } from '../../middlewares/authMiddleware';

@injectable()
export class UserRouter implements IRouterModule {
  private readonly _userRouter: Router;

  constructor(
    @inject(TYPES.RegisterUseCase)
    private readonly _registerUseCase: IRegisterUseCase,
    @inject(TYPES.LoginUseCase)
    private readonly _loginUseCase: ILoginUseCase
  ) {
    this._userRouter = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._userRouter.post('/', async (req: IRequest, res: Response) => {
      await ResponseModel.manageResponse(
        this._registerUseCase.execute(req.body),
        res,
        HttpStatusCode.CREATED,
        Message.CREATED
      );
    });

    this._userRouter.post('/login', async (req: IRequest, res: Response) => {
      await ResponseModel.manageResponse(
        this._loginUseCase.execute(req.body),
        res
      );
    });
  }

  getRouter(): Router {
    return this._userRouter;
  }
}
