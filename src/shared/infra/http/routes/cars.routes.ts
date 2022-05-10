import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();

const createCarController = new CreateCarController()

console.log(carsRoutes)
carsRoutes.post("/", createCarController.handle);


export { carsRoutes };