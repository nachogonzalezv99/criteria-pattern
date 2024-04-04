import { Filter, FilterPrimitives, Operator } from "../../../criteria";
import { faker } from "@faker-js/faker";

export class FilterMother {
  static create(params?: Partial<FilterPrimitives>): Filter {
    const randomOperator =
      Object.values(Operator)[
        Math.floor(Math.random() * Object.values(Operator).length)
      ];

    const primitives: FilterPrimitives = {
      field: faker.string.alpha(10),
      operator: randomOperator,
      value: faker.string.alpha(10),
      ...params,
    };

    return Filter.fromPrimitives(
      primitives.field,
      primitives.operator,
      primitives.value
    );
  }
}
