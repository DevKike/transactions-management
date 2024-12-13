import { Response, Router } from 'express';
import { IRouterModule } from '../../interfaces/IRouterModule';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../inversify/types/types';
import { ICreateOwnCreditCardUseCase } from '../../../../domain/interfaces/creditCard/usecases/ICreateOwnCreditCardUseCase';
import { ResponseModel } from '../../response/ResponseModel';
import { HttpStatusCode } from '../../../../domain/enums/HttpStatusCode';
import { Message } from '../../../../domain/enums/Message';
import { IRequest } from '../../interfaces/IRequest';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { classValidatorMiddleware } from '../../middlewares/classValidatorMiddleware';
import { ICheckCreditCardBalanceUseCase } from '../../../../domain/interfaces/creditCard/usecases/ICheckCreditCardBalanceUseCase';
import { IGetAllCreditCardsUseCase } from '../../../../domain/interfaces/creditCard/usecases/IGetAllCreditCardsUseCase';
import { IGetUserCreditCardsUseCase } from '../../../../domain/interfaces/creditCard/usecases/IGetUserCreditCardsUseCase';
import { CreditCardRegisterDTO } from '../../../validator/creditCard/CreditCardDTO';

@injectable()
export class CreditCardRouter implements IRouterModule {
  private readonly _creditCardRouter: Router;

  constructor(
    @inject(TYPES.CreateOwnCreditCardUseCase)
    private readonly _createOwnCreditCardUseCase: ICreateOwnCreditCardUseCase,
    @inject(TYPES.GetAllCreditCardsUseCase)
    private readonly _getAllCreditCardsUseCase: IGetAllCreditCardsUseCase,
    @inject(TYPES.GetUserCreditCardsUseCase)
    private readonly _getUserCreditCardsUseCase: IGetUserCreditCardsUseCase,
    @inject(TYPES.CheckCreditCardBalanceUseCase)
    private readonly _checkCreditCardBalanceUseCase: ICheckCreditCardBalanceUseCase
  ) {
    this._creditCardRouter = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._creditCardRouter.post(
      '/',
      authMiddleware(),
      classValidatorMiddleware(CreditCardRegisterDTO),
      async (req: IRequest, res: Response) => {
        const bodyWithUser = { user: req.user?.id, ...req.body };
        await ResponseModel.manageResponse(
          this._createOwnCreditCardUseCase.execute(bodyWithUser),
          res,
          HttpStatusCode.CREATED,
          Message.CREATED
        );
      }
    );

    this._creditCardRouter.get('/all', async (req: IRequest, res: Response) => {
      await ResponseModel.manageResponse(
        this._getAllCreditCardsUseCase.execute(),
        res
      );
    });

    this._creditCardRouter.get(
      '/user/all',
      authMiddleware(),
      async (req: IRequest, res: Response) => {
        await ResponseModel.manageResponse(
          this._getUserCreditCardsUseCase.execute(req.user!.id),
          res
        );
      }
    );

    this._creditCardRouter.get(
      '/:id/balance',
      authMiddleware(),
      async (req: IRequest, res: Response) => {
        await ResponseModel.manageResponse(
          this._checkCreditCardBalanceUseCase.execute(
            Number(req.params.id),
            req.user!.id
          ),
          res
        );
      }
    );
  }

  getRouter(): Router {
    return this._creditCardRouter;
  }
}
