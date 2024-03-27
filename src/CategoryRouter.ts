import { Router, Request, Response } from "express";
import { ICategoryPayload } from "./interfaces/types";
import { categoryPlaceholder } from "./interfaces/placeholders";
import { BooksService } from "./api/BooksService";
import { AuthService } from "./api/AuthService";

export class CategoryRouter {
  private router: Router;

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/categories",
      (req: Request<{ perPage: number; page: boolean }>, res: Response) => {
        res.send(categoryPlaceholder);
      }
    );

    this.router.post(
      "/categories",
      (req: Request<{}, {}, {}, ICategoryPayload[]>, res: Response) => {
        res.send(categoryPlaceholder);
      }
    );

    this.router.get(
      "/categories/:id",
      (req: Request<{ id: string }>, res: Response) => {
        res.send(categoryPlaceholder);
      }
    );

    this.router.put(
      "/categories/:id",
      (
        req: Request<{ id: string }, {}, [{ field: string; value: any }]>,
        res: Response
      ) => {
        res.send(categoryPlaceholder);
      }
    );

    this.router.delete(
      "/categories/:id",
      (req: Request<{}, {}, {}>, res: Response) => {
        res.send(categoryPlaceholder);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
