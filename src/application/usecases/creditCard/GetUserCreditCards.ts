import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { IGetUserCreditCards } from '../../../domain/interfaces/creditCard/usecases/IGetUserCreditCards';
import { IUser } from '../../../domain/interfaces/user/IUser';

export class GetUserCreditCards implements IGetUserCreditCards {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(userId: IUser['id']): Promise<ICreditCard[]> {
    return await this._creditCardService.getAllByUserId(userId);
  }
}
