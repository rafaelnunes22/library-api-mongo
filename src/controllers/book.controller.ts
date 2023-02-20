import { Request, Response } from "express";
import { bookModel } from "../models/book.model";
import { IBook } from "../interfaces/book";
import { IRequestError } from "../interfaces/error";

export const bookController = {
  create: async (req: Request<IBook>, res: Response) => {
    try {
      const book = {
        title: req.body.title,
        description: req.body.description,
        rented: req.body.rented,
      };

      const response = await bookModel.create(book);
      return res
        .status(201)
        .json({ response, msg: "Successfully created book." });
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  getAll: async (req: Request<IBook>, res: Response) => {
    try {
      const response = await bookModel.find();
      return res.json(response);
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  get: async (req: Request<IBook>, res: Response) => {
    try {
      const id = req.params.id;
      const response = await bookModel.findById(id);

      if (!response) {
        return res.status(404).json({ msg: "Book not found." });
      }
      return res.json(response);
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req: Request<IBook>, res: Response) => {
    try {
      const id = req.params.id;
      const book = req.body;

      const responseBook = await bookModel.findById(id);

      if (!responseBook) {
        return res.status(404).json({ msg: "Book not found." });
      }

      if (responseBook?.rented) {
        return res.status(403).json({ msg: "Cannot update a rented book." });
      }

      const response = await bookModel.findByIdAndUpdate(id, book, {
        new: true,
      });

      return res
        .status(200)
        .json({ response, msg: "Successfully updated book." });
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req: Request<IBook>, res: Response) => {
    try {
      const id = req.params.id;

      const response = await bookModel.findById(id);

      if (!response) {
        return res.status(404).json({ msg: "Book not found." });
      }

      if (response?.rented) {
        return res.status(403).json({ msg: "Cannot delete a rented book." });
      }

      await bookModel.deleteOne({ id });
      return res.status(200).json({ msg: "Successfully deleted book" });
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  getByTitle: async (req: Request<IBook>, res: Response) => {
    try {
      const title = req.query.title;

      if (!title) {
        const response = await bookModel.find();
        return res.json(response);
      }

      const response = await bookModel.find({
        // eslint-disable-next-line no-useless-escape
        $text: { $search: `\ ${title} \ ` },
      });

      return res.json(response);
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
  rent: async (req: Request<IBook>, res: Response) => {
    try {
      const id = req.params.id;
      const rented = req.body.rented;

      const responseBook = await bookModel.findById(id);

      if (!responseBook) {
        return res.status(404).json({ msg: "Book not found." });
      }

      if (responseBook?.rented && rented) {
        return res
          .status(403)
          .json({ msg: "Cannot rent an already rented book." });
      }

      const response = await bookModel.findByIdAndUpdate(
        id,
        { rented },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({ response, msg: "Successfully updated book." });
    } catch (error) {
      const err = error as IRequestError;
      res.status(500).json({ error: err.message });
    }
  },
};
