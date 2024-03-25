import { Router } from 'express';

export class Controller {
  public path: string;
  public router: Router;
  constructor(path: string) {
    this.path = path;
    this.router = Router();
  }
}
