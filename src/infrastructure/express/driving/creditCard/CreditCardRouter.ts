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

@injectable()
export class CreditCardRouter implements IRouterModule {
  private readonly _creditCardRouter: Router;

  constructor(
    @inject(TYPES.CreateOwnCreditCardUseCase)
    private readonly _createOwnCreditCardUseCase: ICreateOwnCreditCard
  ) {
    this._creditCardRouter = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._creditCardRouter.post(
      '/',
      authMiddleware(),
      // classValidatorMiddleware(CreditCardDTO),
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
  }

  getRouter(): Router {
    return this._creditCardRouter;
  }
}
