import "reflect-metadata";
import express from "express";

const app = express();

app.use(express.json());

import RouterInitializer from "./api/routers";

RouterInitializer(app);

export { app };
