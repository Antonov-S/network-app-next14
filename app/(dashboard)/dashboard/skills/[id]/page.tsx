import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

import SortSkillSelect from "@/components/sort-skill-select";
import { getSkillById } from "@/lib/utils/get-skill-by-id";
import { getUsersBySkillId } from "@/lib/utils/get-users-by-skillId";

type PageProps = {
  params: { id: string };
  searchParams: { sort: string };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = params;
  const { sort } = searchParams;
  const skill = await getSkillById(id);
  const data = await getUsersBySkillId(id, sort);

  if (!skill) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5 max-w-md">
      <h1 className="font-bold text-xl">Users with {skill.name} skill</h1>
      <SortSkillSelect value={sort} />
      <ul className="flex flex-col gap-5">
        {data.map(d => (
          <li key={d.user.id}>
            <Link
              href={`/dashboard/people/${d.user.id}`}
              className="p-2 border-blue-400 border-b flex flex-row justify-between"
            >
              <div className="flex flex-row gap-2 items-center">
                <Avatar src={d.user.image} /> {d.user.name}
              </div>
              <div className="flex flex-row gap-2">
                {d.users_to_skills?.rating} <IconStar color="orange" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
