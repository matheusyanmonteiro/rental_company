import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryServices } from '../modules/cars/services/CreateCategoryServices';


const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => 
{
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryServices(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => 
{
  const object = categoriesRepository.list();
  return response.json(object);
});

export { categoriesRoutes };