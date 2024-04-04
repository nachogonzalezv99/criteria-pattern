
import { Criteria } from "../../shared/domain/criteria/Criteria";
import { User } from "./User";

export interface IUserRepository{
    matching(criteria: Criteria): Promise<User[]>

    count(): Promise<number>
}