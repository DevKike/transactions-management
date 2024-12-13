import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { IGetAllCreditCardsUseCase } from '../../../domain/interfaces/creditCard/usecases/IGetAllCreditCardsUseCase';

export class GetAllCreditCardsUseCase implements IGetAllCreditCardsUseCase {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(): Promise<ICreditCard[]> {
    return await this._creditCardService.getAll();
  }
}
