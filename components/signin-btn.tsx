"use client";

import { Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function SigninBtn() {
  return (
    <Button
      leftSection={<IconBrandGithub />}
      onClick={() =>
        signIn("github", { redirect: false, callbackUrl: "/dashboard" })
      }
    >
      Sign In With GitHub
    </Button>
  );
}
