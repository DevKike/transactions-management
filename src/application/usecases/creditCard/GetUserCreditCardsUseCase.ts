import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { IGetUserCreditCardsUseCase } from '../../../domain/interfaces/creditCard/usecases/IGetUserCreditCardsUseCase';
import { IUser } from '../../../domain/interfaces/user/IUser';

export class GetUserCreditCardsUseCase implements IGetUserCreditCardsUseCase {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(userId: IUser['id']): Promise<ICreditCard[]> {
    return await this._creditCardService.getAllByUserId(userId);
  }
}
