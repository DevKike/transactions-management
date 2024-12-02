import express, { Application as App } from 'express';
import { environment } from '../environments/environment';
import { AppDataSource } from '../database/config/typeorm.config';
import { IRouterManager } from './interfaces/IRouterManager';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify/types/types';

@injectable()
export class Application {
  public _app: App;
  private readonly _PORT = environment.PORT;

  constructor(
    @inject(TYPES.RouterManager) private readonly _routerManager: IRouterManager
  ) {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  public initServer(): void {
    this._app.listen(this._PORT, async () => {
      try {
        await AppDataSource.initialize();
        console.log(`Data source initialized with success!`);
        console.log(`Server running on http://localhost:${this._PORT}`);
      } catch (error) {
        console.error('An error occurred', error);
        process.exit(1);
      }
    });
  }

  private initMiddlewares(): void {
    this._app.use(express.json());
  }

  private initRoutes(): void {
    this._routerManager.manageRoutes(this._app);
  }
}
