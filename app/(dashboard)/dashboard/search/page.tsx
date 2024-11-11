import { getUsersByQuery } from "@/lib/utils/get-users-with-query";

type PageParams = {
  searchParams: { query: string };
};

export default async function Page({ searchParams }: PageParams) {
  const { query } = searchParams;
  const users = await getUsersByQuery(query);

  return (
    <div>
      {users.map(user => (
        <div>{user.firstName}</div>
      ))}
    </div>
  );
}
