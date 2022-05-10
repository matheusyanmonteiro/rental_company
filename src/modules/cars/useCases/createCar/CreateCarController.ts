import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    console.log("dentro do controller");
    const {
      name,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      description,
    } = request.body;

    console.log(name)

    const createCarUseCase = container.resolve(CreateCarUseCase);
    

    const car =  await createCarUseCase.execute({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate
    });
    console.log("fora do const")
    console.log(car);

     return response.status(201).json(car);
  }
}

export { CreateCarController }