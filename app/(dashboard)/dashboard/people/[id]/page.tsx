import { notFound } from "next/navigation";
import { Avatar, NumberFormatter, Rating } from "@mantine/core";

import UserCard from "@/components/user-card";
import { getSimilarPeople } from "@/lib/utils/get-similar-people";
import { getUserById } from "@/lib/utils/get-user-by-id";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;
  if (!id) return notFound();

  const user = await getUserById(id);
  if (!user) return notFound();

  const similarPeople = await getSimilarPeople(user.id);
  return (
    <div className="flex flex-row gap-5">
      <div>
        <UserCard user={user} />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Bio</h2>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: user.bio ?? "" }}
        />
        <h2 className="font-bold text-xl">Skills</h2>
        <div>
          {user.usersToUsersSkills.map(userToUserSkill => (
            <div
              key={userToUserSkill.skillId}
              className="max-w-sm justify-between flex flex-row my-2"
            >
              <div>{userToUserSkill.skill.name}</div>
              <Rating value={userToUserSkill.rating || undefined} readOnly />
            </div>
          ))}
        </div>
        <h2 className="font-bold text-xl">Similar People</h2>
        <div className="flex flex-col gap-5">
          {similarPeople.map(person => (
            <div
              key={person.user.id}
              className="flex flex-row items-center gap-5"
            >
              <Avatar src={person.user.image} size="md" />
              <div>
                {person.user.firstName} {person.user.lastName} -{" "}
                {person.user.jobTitle}
              </div>
              <div className="flex-grow text-right">
                <NumberFormatter
                  value={person.similarity * 100}
                  suffix="%"
                  decimalScale={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
