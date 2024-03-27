import { Request, Response, NextFunction } from "express";
import { Controller } from "./Controller";
import { BooksService } from "../api/BooksService";
import { IBookPayload, Book } from "../interfaces/types";

export class BooksController extends Controller {
  private booksService: BooksService;

  constructor(booksService: BooksService) {
    super();
    this.booksService = booksService;
    console.log("Initializing BooksController");
  }

  async getBooks(
    req: Request<
      {},
      {},
      {},
      { perPage: boolean; page: number; categories: string[]; limit: number }
    >,
    res: Response,
    next: NextFunction
  ) {
    const { perPage, page, categories, limit } = req.query;

    const books = await this.booksService.getBooks(
      perPage ? Boolean(perPage) : undefined,
      page ? Number(page) : undefined,
      categories ? String(categories).split(",") : [],
      limit ? Number(limit) : undefined
    );

    return books;
  }

  async getBook(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id ? Number(req.params.id) : undefined;

    if (id === undefined) {
      return { success: false, result: {} as Book };
    } else {
      const book = await this.booksService.getBookById(id);
      return book;
    }
  }

  async postBooks(
    req: Request<{}, {}, IBookPayload[]>,
    res: Response,
    next: NextFunction
  ) {
    const book = await this.booksService.createBooks(req.body);
    return book;
  }

  async putBook(
    req: Request<{ id: string }, {}, IBookPayload>,
    res: Response,
    next: NextFunction
  ) {
    const book = await this.booksService.editBook(
      Number(req.params.id),
      req.body
    );
    return book;
  }

  async removeBook(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const success = await this.booksService.RemoveBookById(
      Number(req.params.id)
    );
    return success;
  }
}
