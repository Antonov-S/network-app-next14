import { count } from "drizzle-orm";
import { PEOPLE_PER_PAGE } from "../constans";
import { db } from "../db";
import { users } from "../schema";

export async function getUsers(page: number) {
  const countRes = await db.select({ value: count() }).from(users);
  const ofset = PEOPLE_PER_PAGE * (page - 1);
  const data = await db.query.users.findMany({
    limit: PEOPLE_PER_PAGE,
    offset: ofset
  });
  const usersCount = countRes[0].value;
  const numPages = Math.ceil(usersCount / PEOPLE_PER_PAGE);
  return {
    data: data,
    count: usersCount,
    numPages: numPages
  };
}
