import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import SigninBtn from "@/components/signin-btn";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        <SigninBtn />
      </div>
    </>
  );
}
