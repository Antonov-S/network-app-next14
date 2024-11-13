import Link from "next/link";
import { Card } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";

import { getSkills } from "@/lib/utils/get-skills";

export default async function Page() {
  const skills = await getSkills();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-xl">Skills</h1>
      <ul className="flex flex-col gap-5">
        {skills.map(skill => (
          <li key={skill.id}>
            <Link href={`/dashboard/skills/${skill.id}`}>
              <Card withBorder shadow="sm">
                <div className="flex flex-row justify-between">
                  {skill.name}
                  <span className="flex flex-row gap-2">
                    <IconUsersGroup /> {skill.count}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
