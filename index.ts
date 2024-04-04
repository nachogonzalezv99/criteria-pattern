import express, { Request, Response } from "express";
import { FilterPrimitives } from "./src/shared/domain/criteria/Filter";
import { UserByCriteriaSearcher } from "./src/users/application/UserByCriteriaSearcher";
import { InMemoryUserRepository } from "./src/users/infraestructure/InMemoryUserRepository";
import { UsersCounter } from "./src/users/application/UsersCounter";

const app = express();

const repository = new InMemoryUserRepository();
const usersByCriteriaSearcher = new UserByCriteriaSearcher(repository);

const counter = new UsersCounter(repository);

app.get(
  "/users",
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      {
        filters: FilterPrimitives[];
        orderBy?: string;
        order?: string;
        pageSize: string;
        pageNumber: string;
      }
    >,
    res: Response
  ) => {
    const { filters, orderBy, order, pageSize, pageNumber } = req.query;

    const users = await usersByCriteriaSearcher.search(
      filters,
      orderBy,
      order,
      parseInt(pageSize),
      parseInt(pageNumber)
    );

    const usersCount = await counter.count();

    res.json({
      users,
      totalPages: Math.ceil(usersCount / parseInt(pageSize))
    });
  }
);

app.listen(3002, () => {
  console.log(`App running on port <${3002}>`);
});
