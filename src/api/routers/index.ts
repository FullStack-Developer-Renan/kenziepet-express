import { Express } from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import AnimalRouter from "./animal.router";
import passport from "passport";

import jwtStrategy from "../middlewares/jwtStrategy";

export default (app: Express) => {
  passport.use(jwtStrategy());

  const userRouter = UserRouter();
  const authRouter = AuthRouter();
  const animalRouter = AnimalRouter();

  app.use("/api", userRouter);
  app.use("/api", authRouter);
  app.use("/api", animalRouter);
};
