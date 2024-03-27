import { Router, Request, Response, NextFunction } from "express";

export abstract class Middleware implements IMiddleware {
  public handle(req: Request, res: Response, next: NextFunction) {}
}

interface IMiddleware {
  handle: (req: Request, res: Response, next: NextFunction) => void;
}

export class Controller {
  private _router: Router;

  constructor() {
    this._router = Router();
  }
}
