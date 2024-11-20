"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button, Modal, Rating, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { addUsersToSkills, AddUsersToSkillsState } from "@/lib/actions";
import { Skill } from "@/lib/types";

type AddUserToSkillBtnProps = {
  allSkills: Skill[];
};

export default function AddUserToSkillBtn({
  allSkills
}: AddUserToSkillBtnProps) {
  const [opened, { open, close }] = useDisclosure();
  const [value, setValue] = useState(0);

  const initialState: AddUsersToSkillsState = {};

  // Form State
  const [state, dispatch] = useFormState(addUsersToSkills, initialState);

  const data = allSkills.map(skill => {
    return {
      value: skill.id,
      label: skill.name
    };
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Skill" centered>
        <form action={dispatch}>
          <Stack gap={20}>
            <Select
              data={data}
              searchable
              error={state?.errors?.skillId}
              name="skillId"
            />
            <Rating value={value} onChange={setValue} name="rating" />
            {state.errors?.rating && (
              <p className="text-red-600">{state.errors.rating}</p>
            )}
            <div>
              <Button type="submit">Submit</Button>
            </div>

            {state.message && <p className="text-red-600">{state.message}</p>}
            {state.success && <p className="text-green-600">{state.success}</p>}
          </Stack>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />} variant="subtle">
        Add Skill
      </Button>
    </>
  );
}
