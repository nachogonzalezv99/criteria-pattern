import { FilterField } from "./FilterField";
import { FilterOperator, Operator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export class Filter {
    readonly field: FilterField;
    readonly operator: FilterOperator;
    readonly value: FilterValue;
  
    constructor(
      field: FilterField,
      operator: FilterOperator,
      value: FilterValue
    ) {
      this.field = field;
      this.operator = operator;
      this.value = value;
    }
  
    static fromPrimitives(field: string, operator: string, value: string): Filter {
          return new Filter(
              new FilterField(field),
              new FilterOperator(operator as Operator),
              new FilterValue(value),
          );
      }
  
    toPrimitives() {
          return {
              field: this.field.value,
              operator: this.operator.value,
              value: this.operator.value,
          };
      }
  }
  
  export interface FilterPrimitives {
    field: string;
    operator: string;
    value: string;
  }
  
  