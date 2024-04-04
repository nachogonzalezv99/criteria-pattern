import { OrderBy } from "./OrderBy";
import { OrderType, OrderTypes } from "./OrderType";

export class Order {
    constructor(
      public readonly orderBy: OrderBy,
      public readonly orderType: OrderType
    ) {}
  
    static fromPrimitives(orderBy?: string, order?: string): Order {
      return orderBy !== null
        ? new Order(new OrderBy(orderBy!), new OrderType(order as OrderTypes))
        : Order.none();
    }
  
    static none(): Order {
      return new Order(new OrderBy(""), new OrderType(OrderTypes.NONE));
    }
  
    isNone(): boolean {
          return this.orderType.isNone();
      }
  }