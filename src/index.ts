import config from "./config/database";
import { app } from "./app";
import { createConnection } from "typeorm";

const PORT = 3000;

createConnection(config)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log(`Running at http://localhost:${PORT}`);
    });
  })
  .catch(() => process.exit(1));
