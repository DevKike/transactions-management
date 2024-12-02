import { Application } from './infrastructure/express/Application';
import { container } from './infrastructure/inversify/config/inversify.config';
import { TYPES } from './infrastructure/inversify/types/types';

const app = container.get<Application>(TYPES.Application);
app.initServer();
