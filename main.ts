import { App } from "./src/App";
import * as dotenv from "dotenv";

import { BooksController } from "./src/controllers/BooksController";
import { AuthController } from "./src/controllers/AuthController";

import { BooksService } from "./src/api/BooksService";
import { AuthService } from "./src/api/AuthService";
dotenv.config();

async function bootstrap() {
  const bookController = new BooksController(new BooksService());
  const authController = new AuthController(new AuthService());

  const app = new App(bookController, authController);

  await app.run();
}

bootstrap();
