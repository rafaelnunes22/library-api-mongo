import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { IUser } from "../interfaces/user";
import { IRequestError } from "../interfaces/error";

export const userController = {
  createAdminUser: async () => {
    try {
      const hasUser = await userModel.findOne({ username: "admin" });

      if (hasUser) {
        console.log("User already exists.");
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash("1234", salt);

      const user = {
        username: "admin",
        password: passwordHash,
      };

      const response: IUser = await userModel.create(user);
      response.password = undefined;

      console.log("Succesfully created user.");
    } catch (error) {
      const err = error as IRequestError;
      console.error(err.message);
    }
  },
  authenticate: async (req: Request<IUser>, res: Response) => {
    try {
      const { username, password } = req.body;

      const response = await userModel.findOne({ username });

      if (!response) {
        return res.status(404).json({ msg: "User not found." });
      }

      const checkPassword = await bcrypt.compare(password, response.password);

      if (!checkPassword) {
        return res.status(404).json({ msg: "Invalid password." });
      }

      const secret = process.env.SECRET!;

      const token = jwt.sign(
        {
          id: response?.id,
        },
        secret
      );

      return res
        .status(200)
        .json({ token, msg: "Successfully authenticated." });
    } catch (error) {
      const err = error as IRequestError;
      return res.status(500).json({ error: err.message });
    }
  },
};
