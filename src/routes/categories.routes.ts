import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategory';



const categoriesRoutes = Router();
const categoriesRepository = CategoriesRepository.getInstance();

categoriesRoutes.post("/", (request, response) => 
{
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => 
{
  return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };