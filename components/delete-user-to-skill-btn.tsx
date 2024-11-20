"use client";

import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { deleteUserToSkill } from "@/lib/actions";

type DeleteUserToSkillBtnProps = {
  skillId: string;
};

export default function DeleteUserToSkillBtn({
  skillId
}: DeleteUserToSkillBtnProps) {
  function handleClick() {
    console.log("remove", skillId);
    deleteUserToSkill(skillId);
  }

  return (
    <Button
      leftSection={<IconTrash />}
      variant="subtle"
      color="red"
      onClick={handleClick}
    >
      Remove
    </Button>
  );
}
