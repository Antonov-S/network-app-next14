"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { updateUser } from "@/lib/actions";
import { User } from "@/lib/types";
import Editor from "./editor";

type UserFormProps = {
  user: User;
};

export default function UserForm({ user }: UserFormProps) {
  const initialState = { errors: {} };

  const [state, dispach] = useFormState(updateUser, initialState);
  const [bio, setBio] = useState(user.bio);

  function handleUpdate(html: string) {
    setBio(html);
  }

  useEffect(() => {
    if (state.success) {
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green"
      });
    } else if (state.message) {
      notifications.show({
        title: "Error",
        message: "The form submission seems to be invalid",
        color: "red"
      });
    }
  }, [state]);

  return (
    <div>
      <form action={dispach} className="flex flex-col gap-5 max-w-xl">
        <div>
          <TextInput
            label="Job Title"
            name="jobTitle"
            error={state?.errors?.jobTitle}
            defaultValue={user.jobTitle ?? ""}
          />
        </div>
        <div>
          <label>Bio</label>
          <Editor content={user.bio || ""} onUpdate={handleUpdate} />
          <input type="hidden" name="bio" value={bio || ""} />
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
