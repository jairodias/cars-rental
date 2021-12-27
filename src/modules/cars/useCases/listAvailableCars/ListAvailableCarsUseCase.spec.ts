import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({
      name: "valid_name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "valid_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 10,
      license_plate: "valid_plate",
      fine_amount: 10,
      brand: "valid_brand",
      category_id: "valid_category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "valid_category",
    });

    expect(cars).toEqual([car]);
  });
});
