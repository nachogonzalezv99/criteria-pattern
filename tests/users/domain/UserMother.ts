import { User } from "../../../src/users/domain/User";

export class UserMother {
  static create(): User {
    return new User();
  }
}
