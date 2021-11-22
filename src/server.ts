import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaagerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaagerFile));

app.use(router);

app.listen(2222, () => console.log("Server is running!"));
