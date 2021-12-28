import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let dayJsProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayJsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 100,
      license_plate: "valid_license_plate",
      fine_amount: 40,
      category_id: "valid_category_id",
      brand: "valid_brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "valid_user_id",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 100,
      license_plate: "valid_license_plate",
      fine_amount: 40,
      category_id: "valid_category_id",
      brand: "valid_brand",
    });

    await createRentalUseCase.execute({
      user_id: "duplicate_user_id",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "duplicate_user_id",
        car_id: "valid_car_id",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user."));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "valid_name",
      description: "valid_description",
      daily_rate: 100,
      license_plate: "valid_license_plate",
      fine_amount: 40,
      category_id: "valid_category_id",
      brand: "valid_brand",
    });

    await createRentalUseCase.execute({
      user_id: "valid_user_id_1",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "valid_user_id_2",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "valid_user_id",
        car_id: "valid_car_id",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time."));
  });
});
