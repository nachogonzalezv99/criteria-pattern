import { Criteria } from "../../../criteria";
import { IUserRepository } from "../../../src/users/domain/IUserRepository";
import { User } from "../../../src/users/domain/User";

export class MockUserRepository implements IUserRepository {
  mockMatching: jest.Mock;
  constructor() {
    this.mockMatching = jest.fn();
  }
  async matching(criteria: Criteria): Promise<User[]> {
    return this.mockMatching(criteria);
  }

  shouldMatch(users: User[]) {
    this.mockMatching.mockResolvedValueOnce(users);
  }
}
