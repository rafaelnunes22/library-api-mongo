import { Request, Response, Router } from "express";
import { userController } from "../controllers/user.controller";
import { IUser } from "../interfaces/user";

const userRouter = Router();

userRouter
  .route("/user-authenticate")
  .post((req: Request<IUser>, res: Response) =>
    userController.authenticate(req, res)
  );

export { userRouter };
