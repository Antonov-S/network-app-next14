"use client";

import { useFormState } from "react-dom";
import { Button, Textarea, TextInput } from "@mantine/core";

import { updateUser } from "@/lib/actions";
import { User } from "@/lib/types";

type UserFormProps = {
  user: User;
};

export default function UserForm({ user }: UserFormProps) {
  if (!user) return;
  const initialState = { errors: {} };

  const [state, dispach] = useFormState(updateUser, initialState);

  return (
    <div>
      <form action={dispach} className="flex flex-col gap-5">
        <div>
          <TextInput
            label="Job Title"
            name="jobTitle"
            error={state?.errors?.jobTitle}
            defaultValue={user.jobTitle ?? ""}
          />
        </div>
        <div>
          <Textarea
            label="Bio"
            name="bio"
            error={state?.errors?.bio}
            defaultValue={user.bio ?? ""}
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
        <div>
          {state?.success && <p className="text-green-500">{state.success}</p>}
        </div>
      </form>
    </div>
  );
}
