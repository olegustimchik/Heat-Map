import cors from 'cors';
import express, { Application } from 'express';

import { Controller } from './controllers/controller';

export default class App {
  app: Application;

  private port: number;

  private controllers: Controller[];

  constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;
    this.controllers = controllers;
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  start = () => {
    try {
      this.app.use('*', (req, res) => {
        res.sendStatus(400);
      });
      this.app.listen(this.port, () => {
        console.log(`http://localhost:${this.port}/`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  private initializeControllers = () => {
    this.controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };
}
