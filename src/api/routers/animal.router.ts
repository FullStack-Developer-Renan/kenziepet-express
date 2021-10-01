import { Router } from "express";
import {
  create,
  list,
  retrieve,
  update,
  destroy,
} from "../controllers/animal.controller";
import passport from "passport";
import filterIsSuperUSer from "../middlewares/is_superuser";

const router = Router();

export default () => {
  router.post(
    "/animals",
    passport.authenticate("jwt", { session: false }),
    create
  );
  router.get("/animals", list);
  router.get("/animals/:animalId", retrieve);
  router.patch("/animals/:animalId", update);
  router.delete("/animals/:animalId", destroy);

  return router;
};
