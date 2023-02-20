import { Request, Response, Router } from "express";
import { bookController } from "../controllers/book.controller";
import { IBook } from "../interfaces/book";

const bookRouter = Router();

bookRouter.route("/book");

bookRouter
  .route("/book")
  .get((req: Request<IBook>, res: Response) => bookController.getAll(req, res))
  .post((req: Request<IBook>, res: Response) =>
    bookController.create(req, res)
  );

bookRouter
  .route("/book/:id")
  .get((req: Request<IBook>, res: Response) => bookController.get(req, res))
  .put((req: Request<IBook>, res: Response) => bookController.update(req, res))
  .delete((req: Request<IBook>, res: Response) =>
    bookController.delete(req, res)
  );

bookRouter
  .route("/book-search")
  .get((req: Request<IBook>, res: Response) =>
    bookController.getByTitle(req, res)
  );

bookRouter
  .route("/book-details/:id")
  .get((req: Request<IBook>, res: Response) => bookController.get(req, res));

bookRouter
  .route("/book-rent/:id")
  .put((req: Request<IBook>, res: Response) => bookController.rent(req, res));

export { bookRouter };
