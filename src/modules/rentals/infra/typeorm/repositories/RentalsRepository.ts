import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, IsNull, Not, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private readonly repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne(
      { car_id },
      {
        where: {
          end_date: Not(IsNull()),
        },
      }
    );

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne(
      { user_id },
      {
        where: {
          end_date: Not(IsNull()),
        },
      }
    );

    return openByUser;
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    this.repository.save(rental);

    return rental;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });

    return rental;
  }
}

export { RentalsRepository };
