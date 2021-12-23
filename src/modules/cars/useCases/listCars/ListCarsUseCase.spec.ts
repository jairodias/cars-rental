import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    const cars = await listCarsUseCase.execute({});

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    const cars = await listCarsUseCase.execute({
      name: "valid_name",
    });

    expect(cars).toEqual([car]);
  });
});
