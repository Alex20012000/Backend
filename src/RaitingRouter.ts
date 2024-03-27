import { Router, Request, Response } from "express";
import { IRaitingPayload } from "./interfaces/types";
import { BooksService } from "./api/BooksService";
import { AuthService } from "./api/AuthService";

export class RaitingRouter {
  private router: Router;

  constructor(
    private booksService: BooksService,
    private authService: AuthService
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Authentication check middleware
    this.router.use((req: Request, res: Response, next) => {
      // Check if user is authenticated
      // For demonstration, assuming user is authenticated if authorization header is present
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
      }
      // If authenticated, proceed to the next middleware
      next();
    });

    // Add rating endpoint
    this.router.post(
      "/rating",
      async (req: Request<{}, {}, IRaitingPayload[]>, res: Response) => {
        try {
          // Assuming req.body contains rating data
          const ratingData = req.body;
          // Add rating logic here using this.booksService
          // Example: const result = await this.booksService.addRating(ratingData);
          // Return success response
          return res.status(200).send({ message: "Rating added successfully" });
        } catch (error) {
          // Handle error
          console.error("Error adding rating:", error);
          return res.status(500).send({ error: "Internal Server Error" });
        }
      }
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
