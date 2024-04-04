import { Criteria, FilterPrimitives } from "../../../criteria";
import { FiltersMother } from "./FiltersMother";
import { OrderMother } from "./OrderMother";

interface CriteriaPrimitives{
    filters: FilterPrimitives[],
    orderBy?:string;
    orderType?:string;
}

export class CriteriaMother {
  static create(params?: Partial<CriteriaPrimitives>): Criteria {
    const defaultOrder = OrderMother.create();
    const primitives: CriteriaPrimitives = {
      filters: FiltersMother.create().toPrimitives(),
      orderBy: defaultOrder.orderBy.value,
      orderType: defaultOrder.orderType.value,
      ...params,
    };
    return Criteria.fromPrimitives(
      primitives.filters,
      primitives.orderBy,
      primitives.orderType
    );
  }
}
