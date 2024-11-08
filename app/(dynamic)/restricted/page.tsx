import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Restricted Page</h1>
    </div>
  );
}
