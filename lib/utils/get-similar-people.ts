import { getKNearestNeighborsByUserId } from "../knn";

export async function getSimilarPeople(userId: string) {
  const similarPeople = await getKNearestNeighborsByUserId(userId, 5);
  return similarPeople;
}
