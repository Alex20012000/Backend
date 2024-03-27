import { Router, Request, Response } from "express";
import { AuthController } from "./controllers/AuthController";

export class UserRouter {
  private router: Router;
  private authController: AuthController;

  constructor(authController: AuthController) {
    this.authController = authController;
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Login endpoint
    this.router.post(
      "/login",
      async (
        req: Request<{}, {}, { login: string; pass: string }>,
        res: Response
      ) => {
        const token = await this.authController.login(
          req.body.login,
          req.body.pass
        );
        return res.send(token);
      }
    );

    // Register endpoint
    this.router.post(
      "/register",
      async (
        req: Request<
          {},
          {},
          { email: string; pass: string; name: string; about: string }
        >,
        res: Response
      ) => {
        const token = await this.authController.register(
          req.body.email,
          req.body.pass,
          req.body.name,
          req.body.about
        );
        return res.send(token);
      }
    );

    // Server status endpoint
    this.router.get("/", async (req: Request, res: Response) => {
      res.send("Работает");
    });

    // GET /api/v1/user/books — List of books saved by the user (Favorites or Cart)
    // For demonstration purposes, assuming this endpoint returns placeholder data
    this.router.get("/books", async (req: Request, res: Response) => {
      // Placeholder data for books saved by the user
      const userBooksPlaceholder = ["Book 1", "Book 2", "Book 3"];
      res.send(userBooksPlaceholder);
    });

    // PUT /api/v1/user/:id — Edit user data
    // For demonstration purposes, returning placeholder data
    this.router.put(
      "/:id",
      async (
        req: Request<{ id: string }, {}, [{ field: string; value: any }]>,
        res: Response
      ) => {
        // Placeholder response
        const userPlaceholder = { message: "User data edited successfully" };
        res.send(userPlaceholder);
      }
    );

    // DELETE /api/v1/user/:id — Delete user
    // For demonstration purposes, returning placeholder data
    this.router.delete(
      "/:id",
      async (req: Request<{ id: string }>, res: Response) => {
        // Placeholder response
        const userPlaceholder = { message: "User deleted successfully" };
        res.send(userPlaceholder);
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
