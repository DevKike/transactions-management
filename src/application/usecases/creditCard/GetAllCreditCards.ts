import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { IGetAllCreditCards } from '../../../domain/interfaces/creditCard/usecases/IGetAllCreditCards';

export class GetAllCreditCards implements IGetAllCreditCards {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(): Promise<ICreditCard[]> {
    return await this._creditCardService.getAll();
  }
}
