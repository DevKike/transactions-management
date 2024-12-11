import { Container } from 'inversify';
import { TYPES } from '../types/types';
import { AppDataSource } from '../../database/config/typeorm.config';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';
import { UserRepository } from '../../repositories/user/UserRepository';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { UserService } from '../../services/user/UserService';
import { RegisterUseCase } from '../../../application/usecases/user/RegisterUseCase';
import { Application } from '../../express/Application';
import { IRouterManager } from '../../express/interfaces/IRouterManager';
import { RouterManager } from '../../express/driving/RouterManager';
import { IRouterModule } from '../../express/interfaces/IRouterModule';
import { UserRouter } from '../../express/driving/user/UserRouter';
import { IJwtService } from '../../jwt/interfaces/IJwtService';
import { AuthService } from '../../services/auth/AuthService';
import { LoginUseCase } from '../../../application/usecases/user/LoginUseCase';
import { GetUserDataById } from '../../../application/usecases/user/GetUserDataByIdUseCase';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { CreditCardRepository } from '../../repositories/creditCard/CreditCardRepository';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { CreditCardService } from '../../services/creditCard/CreditCardService';
import { ICreateOwnCreditCard } from '../../../domain/interfaces/creditCard/usecases/ICreateOwnCreditCard';
import { ILoginUseCase } from '../../../domain/interfaces/user/usecases/ILoginUseCase';
import { IGetUserDataByIdUseCase } from '../../../domain/interfaces/user/usecases/IGetUserDataByIdUseCase';
import { CreateOwnCreditCard } from '../../../application/usecases/creditCard/CreateOwnCreditCard';
import { CreditCardRouter } from '../../express/driving/creditCard/CreditCardRouter';
import { ICheckCreditCardBalance } from '../../../domain/interfaces/creditCard/usecases/ICheckCreditCardBalance';
import { CheckCreditCardBalance } from '../../../application/usecases/creditCard/CheckCreditCardBalance';

const container = new Container();

container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

container.bind<Application>(TYPES.Application).to(Application);
container.bind<IRouterManager>(TYPES.RouterManager).to(RouterManager);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind(TYPES.RegisterUseCase).toDynamicValue((context) => {
  const userService = context.container.get<IUserService>(TYPES.UserService);
  return new RegisterUseCase(userService);
});
container.bind<IJwtService>(TYPES.AuthService).to(AuthService);
container.bind<ILoginUseCase>(TYPES.LoginUseCase).toDynamicValue((context) => {
  const userService = context.container.get<IUserService>(TYPES.UserService);
  return new LoginUseCase(userService);
});
container
  .bind<IGetUserDataByIdUseCase>(TYPES.GetUserDataByIdUseCase)
  .toDynamicValue((context) => {
    const userService = context.container.get<IUserService>(TYPES.UserService);
    return new GetUserDataById(userService);
  });
container.bind<IRouterModule>(TYPES.UserRouter).to(UserRouter);

container
  .bind<ICreditCardRepository>(TYPES.CreditCardRepository)
  .to(CreditCardRepository);
container
  .bind<ICreditCardService>(TYPES.CreditCardService)
  .to(CreditCardService);
container
  .bind<ICreateOwnCreditCard>(TYPES.CreateOwnCreditCardUseCase)
  .toDynamicValue((context) => {
    const creditCardService = context.container.get<ICreditCardService>(
      TYPES.CreditCardService
    );
    return new CreateOwnCreditCard(creditCardService);
  });
container
  .bind<ICheckCreditCardBalance>(TYPES.CheckCreditCardBalance)
  .toDynamicValue((context) => {
    const creditCardService = context.container.get<ICreditCardService>(
      TYPES.CreditCardService
    );
    return new CheckCreditCardBalance(creditCardService);
  });
container.bind<IRouterModule>(TYPES.CreditCardRouter).to(CreditCardRouter);
export { container };
