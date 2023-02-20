import { Router } from "express";

import { bookRouter } from "./book.routes";
import { userRouter } from "./user.routes";
import { checkToken } from "../middlewares/checkPassword";

const routes = Router();

routes.use(checkToken);

routes.use("/", bookRouter);

routes.use("/", userRouter);

export { routes };
