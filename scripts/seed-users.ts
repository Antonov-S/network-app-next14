import { faker } from "@faker-js/faker";

import { NewUser } from "@/lib/types";
import { db, pool } from "@/lib/db";
import { users } from "@/lib/schema";
import { RICH_TEXT_BIO } from "@/lib/constans";

export default async function main() {
  for (let i = 0; i < 100; i++) {
    const username = faker.internet.username();
    const email = `${username}@example.com`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const image = faker.image.avatarGitHub();

    const randomBio =
      RICH_TEXT_BIO[Math.floor(Math.random() * RICH_TEXT_BIO.length)];

    const newUser: NewUser = {
      id: crypto.randomUUID(),
      name: username,
      email: email,
      image: image,
      firstName: firstName,
      lastName: lastName,
      bio: randomBio
    };

    await db.insert(users).values(newUser);
  }
}

if (require.main === module) {
  main();
  pool.end();
}
