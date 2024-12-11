import { Response, Router } from 'express';
import { IRouterModule } from '../../interfaces/IRouterModule';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../inversify/types/types';
import { ICreateOwnCreditCard } from '../../../../domain/interfaces/creditCard/usecases/ICreateOwnCreditCard';
import { ResponseModel } from '../../response/ResponseModel';
import { HttpStatusCode } from '../../../../domain/enums/HttpStatusCode';
import { Message } from '../../../../domain/enums/Message';
import { IRequest } from '../../interfaces/IRequest';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { classValidatorMiddleware } from '../../middlewares/classValidatorMiddleware';
import { CreditCardDTO } from '../../../validator/creditCard/CreditCardDTO';
import { ICheckCreditCardBalance } from '../../../../domain/interfaces/creditCard/usecases/ICheckCreditCardBalance';
import { IGetAllCreditCards } from '../../../../domain/interfaces/creditCard/usecases/IGetAllCreditCards';
import { IGetUserCreditCards } from '../../../../domain/interfaces/creditCard/usecases/IGetUserCreditCards';

@injectable()
export class CreditCardRouter implements IRouterModule {
  private readonly _creditCardRouter: Router;

  constructor(
    @inject(TYPES.CreateOwnCreditCardUseCase)
    private readonly _createOwnCreditCardUseCase: ICreateOwnCreditCard,
    @inject(TYPES.GetAllCreditCards)
    private readonly _getAllCreditCards: IGetAllCreditCards,
    @inject(TYPES.GetUserCreditCards)
    private readonly _getUserCreditCards: IGetUserCreditCards,
    @inject(TYPES.CheckCreditCardBalance)
    private readonly _checkCreditCardBalance: ICheckCreditCardBalance
  ) {
    this._creditCardRouter = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._creditCardRouter.post(
      '/',
      authMiddleware(),
      classValidatorMiddleware(CreditCardDTO),
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
        this._getAllCreditCards.execute(),
        res
      );
    });

    this._creditCardRouter.get(
      '/user/all',
      authMiddleware(),
      async (req: IRequest, res: Response) => {
        await ResponseModel.manageResponse(
          this._getUserCreditCards.execute(Number(req.user?.id)),
          res
        );
      }
    );

    this._creditCardRouter.get(
      '/:id/balance',
      authMiddleware(),
      async (req: IRequest, res: Response) => {
        await ResponseModel.manageResponse(
          this._checkCreditCardBalance.execute(Number(req.params.id)),
          res
        );
      }
    );
  }

  getRouter(): Router {
    return this._creditCardRouter;
  }
}
