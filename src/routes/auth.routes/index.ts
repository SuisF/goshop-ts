import { Express } from "express";
import { AuthController } from "../../controller/auth.controller";

export default function AuthRoutes(app: Express) {
  const authController = new AuthController();

  app.post(`/v1/signup`, authController.signUp);
  app.post(`/v1/signin`, authController.signIn);

  app.post(`/v1/kurir_signup`, authController.kurirSignUp);
  app.post(`/v1/kurir_signin`, authController.kurirSignIn);
}
