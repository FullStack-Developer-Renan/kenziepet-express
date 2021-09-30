import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

export default () => {
  router.post("/login", login);

  return router;
};
