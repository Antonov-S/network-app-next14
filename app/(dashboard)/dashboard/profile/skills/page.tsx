import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getUsersToSkillsByUserId } from "@/lib/utils/get-users-to-skills-by-userId";
import { SkillRatingForm } from "@/components/skill-rating-form";
import AddUserToSkillBtn from "@/components/add-user-to-skill-btn";
import { getAllSkills } from "@/lib/utils/get-all-skills";
import DeleteUserToSkillBtn from "@/components/delete-user-to-skill-btn";

export default async function Page() {
  const session = await auth();
  if (!session?.user.id) return notFound();

  const usersToSkills = await getUsersToSkillsByUserId(session.user.id);
  const allSkills = await getAllSkills();

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <h1 className="font-bold text-xl">Manage Skills</h1>
      <table className="border-collapse border-0">
        <thead>
          <tr>
            <th className="border-slate-600 p-2 border-b text-left">Name</th>
            <th className="border-slate-600 p-2 border-b text-left">Rating</th>
            <th className="border-slate-600 p-2 border-b text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersToSkills.map(userToSkill => (
            <tr key={userToSkill.skill.id}>
              <td className="border-slate-600 p-2 border-t">
                {userToSkill.skill.name}
              </td>
              <td className="border-slate-600 p-2 border-t">
                <SkillRatingForm
                  rating={userToSkill.rating || 0}
                  skillId={userToSkill.skillId}
                />
              </td>
              <td className="border-slate-600 p-2 border-t">
                <DeleteUserToSkillBtn skillId={userToSkill.skillId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddUserToSkillBtn allSkills={allSkills} />
      </div>
    </div>
  );
}
