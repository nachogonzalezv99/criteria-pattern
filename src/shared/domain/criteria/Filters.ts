import { Filter, FilterPrimitives } from "./Filter";
import { FilterField } from "./FilterField";
import { FilterOperator, Operator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export class Filters {
    constructor(public readonly value: Filter[]) {}
  
    static fromPrimitives(filters: FilterPrimitives[]): Filters {
      return new Filters(
        filters?.map(
          (filter) =>
            new Filter(
              new FilterField(filter.field),
              new FilterOperator(filter.operator as Operator),
              new FilterValue(filter.value)
            )
        )||[]
      );
    }
  
    isEmpty(): boolean {
          return this.value.length === 0;
      }
  
    toPrimitives(): FilterPrimitives[] {
          return this.value.map((filter) => filter.toPrimitives());
      }
  }
  
  