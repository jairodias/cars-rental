import { Router } from "express";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return CreateSpecificationController.handle(request, response);
});

export { specificationsRoutes };
