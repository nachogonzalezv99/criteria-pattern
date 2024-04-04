import { faker } from "@faker-js/faker";
import { Order, OrderTypes } from "../../../criteria";

type OrderPrimitives = {
  orderBy?: string;
  orderType?: string;
};

export class OrderMother {
  static create(params?: Partial<OrderPrimitives>): Order {
    const randomOrderType =
      Object.values(OrderTypes)[
        Math.floor(Math.random() * Object.values(OrderTypes).length)
      ];

    const primitives: OrderPrimitives = {
      orderBy: faker.string.alpha(10),
      orderType: randomOrderType,
      ...params,
    };

    return Order.fromPrimitives(primitives.orderBy, primitives.orderType);
  }
}
