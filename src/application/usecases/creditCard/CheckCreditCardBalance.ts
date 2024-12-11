import { ICheckCreditCardBalance } from '../../../domain/interfaces/creditCard/usecases/ICheckCardBalance';
import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';

export class CheckCreditCardBalance implements ICheckCreditCardBalance {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(creditCardId: ICreditCard['id']): Promise<number> {
    return await this._creditCardService.checkBalance(creditCardId);
  }
}
