import { faker } from "@faker-js/faker";

import { NewUser } from "@/lib/types";
import { db, pool } from "@/lib/db";
import { users } from "@/lib/schema";

async function main() {
  for (let i = 0; i < 100; i++) {
    const username = faker.internet.username();
    const email = `${username}@example.com`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const image = faker.image.avatarGitHub();
    const newUser: NewUser = {
      id: crypto.randomUUID(),
      name: username,
      email: email,
      image: image,
      firstName: firstName,
      lastName: lastName
    };
    await db.insert(users).values(newUser);
  }
  pool.end();
}

main();
