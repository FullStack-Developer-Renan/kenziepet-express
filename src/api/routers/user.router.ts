import { Router } from "express";
import { create, get } from "../controllers/user.controller";

const router = Router();

export default () => {
  router.post("/user", create);
  router.get("/user/:username", get);

  return router;
};
