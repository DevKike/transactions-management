import express, { Application as App } from 'express';
import { environment } from '../environments/environment';
import { AppDataSource } from '../typeorm/config/config';

export class Application {
  public _app: App;
  private readonly _PORT = environment.PORT;

  constructor() {
    this._app = express();
    this.initMiddlewares();
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
}
