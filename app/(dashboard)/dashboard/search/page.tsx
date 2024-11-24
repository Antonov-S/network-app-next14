import UsersTable from "@/components/users-table";
import { fuzzySearsh } from "@/lib/utils/fuzzy-search";

type PageParams = {
  searchParams: { query: string };
};

export default async function Page({ searchParams }: PageParams) {
  const { query } = searchParams;
  const users = await fuzzySearsh(query);

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
