"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComboboxItem, Select } from "@mantine/core";

type SortSkillSelectProps = {
  value: string;
};

export default function SortSkillSelect({ value }: SortSkillSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(value: string | null, option: ComboboxItem) {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      return;
    }
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      label="Sort"
      data={[
        { value: "name", label: "Name A to Z" },
        { value: "-name", label: "Name Z to A" },
        { value: "rating", label: "Rating Low to High" },
        { value: "-rating", label: "Rating High to Low" }
      ]}
      onChange={handleChange}
      value={value}
      placeholder="Sort by Name or Rating"
    />
  );
}
