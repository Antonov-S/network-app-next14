"use client";

import { useFormState } from "react-dom";
import { Rating } from "@mantine/core";

import { updateSkillRating } from "@/lib/actions";

type SkillRatingFormProps = {
  rating: number;
  skillId: string;
};

export function SkillRatingForm({ rating, skillId }: SkillRatingFormProps) {
  const initialState = {};
  const [state, dispatch] = useFormState(updateSkillRating, initialState);

  async function handleChange(newRating: number) {
    const formData = new FormData();
    formData.set("rating", newRating.toString());
    formData.set("skillId", skillId);
    await dispatch(formData);
    // console.log(state);
  }

  return <Rating value={rating} onChange={handleChange} />;
}
