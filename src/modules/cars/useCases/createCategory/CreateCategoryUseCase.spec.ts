import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "valid_category",
      description: "description_valid",
    };

    await createCategoryUseCase.execute({
      name: "valid_category",
      description: "description_valid",
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    await createCategoryUseCase.execute({
      name: "valid_category",
      description: "description_valid",
    });

    await expect(
      createCategoryUseCase.execute({
        name: "valid_category",
        description: "description_valid",
      })
    ).rejects.toEqual(new AppError("Category already exists."));
  });
});
