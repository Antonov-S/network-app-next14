"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mantine/core";

type PaginationContainerProps = {
  total: number;
  value: number;
};

export default function PaginationContainer({
  total,
  value
}: PaginationContainerProps) {
  const [activePage, setActivePage] = useState(value);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      const num = parseInt(page);
      setActivePage(num);
    }
  }, []);

  function handleChange(page: number) {
    setActivePage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination total={total} onChange={handleChange} value={activePage} />
  );
}
