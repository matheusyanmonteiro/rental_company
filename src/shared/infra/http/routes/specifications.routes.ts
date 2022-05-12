import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
//specificationsRoutes.use(ensureAuthenticated); in this form all route needs to be authenticated;
specificationsRoutes.post("/",
  ensureAuthenticated,
  ensureAdmin,    
  createSpecificationController.handle
);

export { specificationsRoutes };