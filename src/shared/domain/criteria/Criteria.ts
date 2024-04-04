import { FilterPrimitives } from "./Filter";
import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
  constructor(
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly pageSize?: number,
    public readonly pageNumber?: number
  ) {
    if (!pageNumber && pageSize) {
      throw new Error("Page size is required when page number is defined");
    }
  }

  static fromPrimitives(
    filters: FilterPrimitives[],
    orderBy: string | undefined,
    order: string | undefined,
    pageSize?: number,
    pageNumber?: number
  ): Criteria {
    return new Criteria(
      Filters.fromPrimitives(filters),
      Order.fromPrimitives(orderBy, order),
      pageSize,
      pageNumber
    );
  }

  hasOrder(): boolean {
    return !this.order.isNone();
  }

  hasFilters(): boolean {
    return !this.filters.isEmpty();
  }
}
