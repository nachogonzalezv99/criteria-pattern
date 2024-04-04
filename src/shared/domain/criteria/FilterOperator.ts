export enum Operator {
    EQUAL = "equals",
    GT = "gt",
    LT = "lt",
    CONTAINS = "contains",
  }
  
  export class FilterOperator {
    constructor(public readonly value: Operator) {}
  }
  