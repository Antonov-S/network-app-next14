import UsersTable from "@/components/users-table";
import { fuzzySearsh } from "@/lib/utils/fuzzy-search";
import { getUsersByQuery } from "@/lib/utils/get-users-with-query";

type PageParams = {
  searchParams: { query: string };
};

export default async function Page({ searchParams }: PageParams) {
  const { query } = searchParams;
  //   const users = await getUsersByQuery(query);
  const users = await fuzzySearsh(query);

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
