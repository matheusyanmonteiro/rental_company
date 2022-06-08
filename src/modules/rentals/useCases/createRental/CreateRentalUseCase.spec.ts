import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementatios/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let daysJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    daysJsDateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      daysJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "123451",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date")
  });

  it("should not be able to create a new rental if there is another open to the same user", 
    async () => {
      expect(async() => {
        const genericEntityOne = await createRentalUseCase.execute({
          user_id: "test",
          car_id: "123451",
          expected_return_date: dayAdd24Hours,
        });
  
        const genericEntityTwo = await createRentalUseCase.execute({
          user_id: "test",
          car_id: "123452",
          expected_return_date: dayAdd24Hours,
        })
      }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to same car",
    async() => {
      expect(async () => {
        const genericEntityOne = await createRentalUseCase.execute({
          user_id: "12345",
          car_id: "test",
          expected_return_date: dayAdd24Hours,
        });

        const genericEntityTwo = await createRentalUseCase.execute({
          user_id: "11213",
          car_id: "test",
          expected_return_date: dayAdd24Hours,
        });
      }).rejects.toBeInstanceOf(AppError)
    }
  );

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError);
  });

});