import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  private readonly MINIMUM_DAILY = 1;

  constructor(
    @inject("RentalsRepository")
    private readonly rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private readonly dateProvier: DayjsDateProvider
  ) {}
  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental doesn't exists.");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError("Car doesn't exists.");
    }

    const dateNow = this.dateProvier.dateNow();
    let daily = this.dateProvier.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = this.MINIMUM_DAILY;
    }

    const delay = this.dateProvier.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total += calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvier.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
