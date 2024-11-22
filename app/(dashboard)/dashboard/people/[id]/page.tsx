import UserCard from "@/components/user-card";
import { getUserById } from "@/lib/utils/get-user-by-id";
import { notFound } from "next/navigation";
import { use } from "react";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;
  if (!id) return notFound();

  const user = await getUserById(id);
  if (!user) return notFound();
  return (
    <div className="flex flex-row gap-5">
      <div>
        <UserCard user={user} />
      </div>
      <div>
        <h2 className="font-bold text-xl">Bio</h2>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: user.bio ?? "" }}
        />
      </div>
    </div>
  );
}
