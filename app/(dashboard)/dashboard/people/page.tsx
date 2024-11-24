import PaginationContainer from "@/components/pagination-container";
import UserCard from "@/components/user-card";
import { getUsers } from "@/lib/utils/get-users";
import Link from "next/link";

type PageParams = {
  searchParams: { page: number };
};

export default async function Page({ searchParams }: PageParams) {
  const page = searchParams.page || 1;

  const res = await getUsers(page);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">People</h1>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {res.data.map(user => (
          <div key={user.id}>
            <Link href={`/dashboard/people/${user.id}`}>
              <UserCard user={user} />
            </Link>
          </div>
        ))}
      </div>
      <PaginationContainer total={res.numPages} value={page} />
    </div>
  );
}
