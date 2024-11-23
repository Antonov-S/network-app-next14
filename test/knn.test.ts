import { expect, test } from "vitest";
import util from "util";

import { getKNearestNeighborsByUserId } from "@/lib/knn";

test("k nearest neighbors", async () => {
  const users = await getKNearestNeighborsByUserId(
    "015cbe8e-eab3-40b6-bdee-71d46312ce76",
    5
  );
  console.log(util.inspect(users, { colors: true, depth: null }));
  expect(users.length).toBe(5);
});
