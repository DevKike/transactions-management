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

const container = new Container();

container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

container.bind<Application>(TYPES.Application).to(Application);
container.bind<IRouterManager>(TYPES.RouterManager).to(RouterManager);
container.bind<IRouterModule>(TYPES.UserRouter).to(UserRouter);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind(TYPES.RegisterUseCase).toDynamicValue((context) => {
  const userService = context.container.get<IUserService>(TYPES.UserService);
  return new RegisterUseCase(userService);
});

export { container };
