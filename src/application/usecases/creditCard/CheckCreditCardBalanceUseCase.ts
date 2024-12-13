import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICheckCreditCardBalanceUseCase } from '../../../domain/interfaces/creditCard/usecases/ICheckCreditCardBalanceUseCase';
import { IUser } from '../../../domain/interfaces/user/IUser';

export class CheckCreditCardBalanceUseCase
  implements ICheckCreditCardBalanceUseCase
{
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(
    creditCardId: ICreditCard['id'],
    userId: IUser['id']
  ): Promise<number> {
    return await this._creditCardService.checkBalance(creditCardId, userId);
  }
}
