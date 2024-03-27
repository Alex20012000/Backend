import { BooksController } from "../src/controllers/BooksController";
import { AuthController } from "../src/controllers/AuthController";
import cors from "cors";
import express, { Express } from "express";
import { BooksRouter } from "./BooksRouter";
import { UserRouter } from "./UserRouter";
import { LoggerMiddleware } from "./controllers/LoggerMiddleware";

export class App {
  private app: Express;
  private loggerMiddleware: LoggerMiddleware;
  private booksRouter: BooksRouter;
  private userRouter: UserRouter;
  private readonly port: number;

  constructor(
    booksController: BooksController,
    authController: AuthController
  ) {
    this.app = express();
    this.port = Number(process.env.APP_PORT) || 8080;
    this.loggerMiddleware = new LoggerMiddleware();
    this.booksRouter = new BooksRouter(booksController);
    this.userRouter = new UserRouter(authController);
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use("/api/v1", this.userRouter.getRouter);
    this.app.use(
      "/api/v1/books",
      this.loggerMiddleware.handle,
      this.booksRouter.getRouter
    );
  }

  public async run() {
    this.app.listen(this.port, () => {
      console.log("Приложение запущено!");
    });
  }
}
