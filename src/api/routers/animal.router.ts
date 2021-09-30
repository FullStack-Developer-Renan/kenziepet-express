import { Router } from "express";
import { create } from "../controllers/animal.controller";

const router = Router();

export default () => {
  router.post("/animals", create);
  //   router.get("/user/:username", get);

  return router;
};
