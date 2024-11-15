import { auth } from "@/lib/auth";

import UserForm from "@/components/user-form";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <UserForm user={session?.user} />
    </>
  );
}
