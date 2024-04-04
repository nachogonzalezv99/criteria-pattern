import { Criteria } from "../../shared/domain/criteria/Criteria";
import { FilterPrimitives } from "../../shared/domain/criteria/Filter";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class UserByCriteriaSearcher {
  constructor(private readonly repository: IUserRepository) {}

  async search(
    filters: FilterPrimitives[],
    orderBy?: string,
    orderType?: string,
    pageSize?: number,
    pageNumer?: number
  ): Promise<User[]> {
    const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumer);

    return await this.repository.matching(criteria);
  }
}
