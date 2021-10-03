import { Request, Response, NextFunction } from "express";

export const animalValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;

  if (
    requestBody.name !== undefined &&
    requestBody.sex !== undefined &&
    requestBody.age !== undefined &&
    requestBody.weight !== undefined &&
    requestBody.group !== undefined &&
    requestBody.characteristics !== undefined
  ) {
    return next();
  }

  let errorMessage = "Missing fields ";

  if (requestBody.name == undefined) {
    errorMessage += "name ";
  }

  if (requestBody.age == undefined) {
    errorMessage += "age ";
  }

  if (requestBody.weight == undefined) {
    errorMessage += "weight ";
  }

  if (requestBody.sex == undefined) {
    errorMessage += "sex ";
  }

  if (requestBody.group == undefined) {
    errorMessage += "group ";
  }

  if (requestBody.characteristics == undefined) {
    errorMessage += "characteristics ";
  }

  return res.status(400).send({ error: errorMessage });
};
