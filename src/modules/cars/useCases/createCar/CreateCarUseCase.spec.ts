import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Test",
      description: "Teste Description Car",
      daily_rate: 100,
      license_plate: "ABCE1234",
      fine_amount: 60,
      brand: "Brand Test",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "test",
      daily_rate: 100,
      license_plate: "ABCE1234",
      fine_amount: 60,
      brand: "test",
      category_id: "test",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "test",
        daily_rate: 100,
        license_plate: "ABCE1234",
        fine_amount: 60,
        brand: "test",
        category_id: "test",
      })
    ).rejects.toEqual(new AppError("Car Already Exists!", 406));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ACDF1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
