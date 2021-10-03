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
import { animalValidator } from "../middlewares/animal.validator";
import authentication from "../middlewares/authentication";

const router = Router();

export default () => {
  router.use(passport.authenticate("jwt", { session: false }));

  router.post("/animals", filterIsSuperUSer, animalValidator, create);
  router.get("/animals", authentication, list);
  router.get("/animals/:animalId", authentication, retrieve);
  router.patch(
    "/animals/:animalId",
    filterIsSuperUSer,
    animalValidator,
    update
  );
  router.put("/animals/:animalId", filterIsSuperUSer, animalValidator, update);
  router.delete("/animals/:animalId", filterIsSuperUSer, destroy);

  return router;
};
