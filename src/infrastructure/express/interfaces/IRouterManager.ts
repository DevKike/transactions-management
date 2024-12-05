import { Application } from "express";

export interface IRouterManager {
  manageRoutes(app: Application): void;
}
