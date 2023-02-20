import mongoose from "mongoose";
import { userController } from "../controllers/user.controller";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export async function conn() {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.lzpxpaf.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Mongo connected");

    await userController.createAdminUser();
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
}
