import { Criteria } from "../../shared/domain/criteria/Criteria";
import { prisma } from "../../shared/infraestructure/prisma";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { CriteriaToPrismaConverter } from "./CriteriaToPrismaConverter";

export class InMemoryUserRepository implements IUserRepository {
  async matching(criteria: Criteria): Promise<User[]> {
    const converter = new CriteriaToPrismaConverter();

    const prismaOrder: any = criteria.hasOrder()
      ? {
          orderBy: {
            [criteria.order.orderBy.value]: criteria.order.orderType.value,
          },
        }
      : {};

    let filters = {};

    for (const filter of criteria.filters.value) {
      filters = {
        ...filters,
        [filter.field.value]: {
          [filter.operator.value]: filter.value.value,
        },
      };
    }

    let limit = undefined;
    if (criteria.pageSize) {
      limit = criteria.pageSize;
    }

    let offset = undefined;
    if (criteria.pageSize && criteria.pageNumber) {
      offset = criteria.pageSize * (criteria.pageNumber - 1);
    }

    const prismaFilters: any = criteria.hasFilters()
      ? {
          where: { ...filters },
        }
      : {};
    console.log(prismaFilters);

    const users = await prisma.user.findMany({
      ...prismaOrder,
      ...prismaFilters,
      take: limit,
      skip: offset,
    });

    return users.map((user) => new User(user));
  }

  async count(): Promise<number> {
    return await prisma.user.count();
  }
}
