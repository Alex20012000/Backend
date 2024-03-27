import { Router, Request, Response, NextFunction } from "express";
import { IBookPayload } from "./interfaces/types";
import { BooksController } from "./controllers/BooksController";

export class BooksRouter {
  private router: Router;

  constructor(booksController: BooksController) {
    this.router = Router();
    this.initializeRoutes(booksController);
  }

  private initializeRoutes(booksController: BooksController): void {
    this.router.get(
      "/books",
      async (
        req: Request<
          {},
          {},
          {},
          {
            perPage: boolean;
            page: number;
            categories: string[];
            limit: number;
          }
        >,
        res: Response,
        next: NextFunction
      ) => {
        const books = await booksController.getBooks(req, res, next);
        res.send(books);
      }
    );

    this.router.post(
      "/books",
      async (
        req: Request<{}, {}, IBookPayload[]>,
        res: Response,
        next: NextFunction
      ) => {
        const book = await booksController.postBooks(req, res, next);
        res.send(book);
      }
    );

    this.router.get(
      "/book/:id",
      async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
      ) => {
        const book = await booksController.getBook(req, res, next);
        res.send(book);
      }
    );

    this.router.put(
      "/book/:id",
      async (
        req: Request<{ id: string }, {}, IBookPayload>,
        res: Response,
        next: NextFunction
      ) => {
        const book = await booksController.putBook(req, res, next);
        res.send(book);
      }
    );

    this.router.delete(
      "/book/:id",
      async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
      ) => {
        const success = await booksController.removeBook(req, res, next);
        res.send(success);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
