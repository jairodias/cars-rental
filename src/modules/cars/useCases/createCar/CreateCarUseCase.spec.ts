import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "invalid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    await expect(
      createCarUseCase.execute({
        name: "valid_name",
        description: "valid_description",
        daily_rate: 10,
        license_plate: "invalid_plate",
        fine_amount: 10,
        brand: "valid_brand",
        category_id: "valid_category",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
  });

  it("should not be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    expect(car.available).toBe(true);
  });
});
