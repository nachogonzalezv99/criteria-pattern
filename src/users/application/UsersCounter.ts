import { IUserRepository } from "../domain/IUserRepository";

export class UsersCounter {
  constructor(private readonly repository: IUserRepository) {}

  async count(): Promise<number> {

    return await this.repository.count();
  }
}
