import mongoose from "mongoose";
import { userController } from "../controllers/user.controller";

export async function conn() {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DB_URL!);
    console.log("Mongo connected");

    await userController.createAdminUser();
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
}
