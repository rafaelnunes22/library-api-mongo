import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IBook } from "../interfaces/book";

export const checkToken = async (
  req: Request<IBook>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!req.path.includes("book" || "authenticate")) {
    return next();
  }

  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    const secret = process.env.SECRET!;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token." });
  }
};
