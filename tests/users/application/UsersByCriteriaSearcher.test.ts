import { UserByCriteriaSearcher } from "../../../src/users/application/UserByCriteriaSearcher";
import { CriteriaMother } from "../../shared/domain/CriteriaMother";
import { MockUserRepository } from "../__mocks__/MockUserRepository";
import { UserMother } from "../domain/UserMother";

let repository: MockUserRepository;
let usersByCriteriaSearcher: UserByCriteriaSearcher;

beforeEach(() => {
  repository = new MockUserRepository();
  usersByCriteriaSearcher = new UserByCriteriaSearcher(repository);
});

describe("UsersByCriteriaSearcher should", () => {
  it("search users using criteria", async () => {
    const criteria = CriteriaMother.create();
    const expectedUsers = [UserMother.create()];

    repository.shouldMatch(expectedUsers);

    const res = await usersByCriteriaSearcher.search(
      criteria.filters.toPrimitives(),
      criteria.order.orderBy.value,
      criteria.order.orderType.value
    );

    expect(res).toStrictEqual(expectedUsers);
  });
});
