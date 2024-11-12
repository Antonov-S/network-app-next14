"use client";

import Link from "next/link";
import { Table } from "@mantine/core";

import { User } from "@/lib/types";

type UsersTableProps = {
  users: User[];
};

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Username</Table.Th>
          <Table.Th>First Name</Table.Th>
          <Table.Th>last Name</Table.Th>
          <Table.Th>Job Title</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map(user => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <Link
                href={`/dashboard/people/${user.id}`}
                className="text-blue-500"
              >
                {user.name}
              </Link>
            </Table.Td>
            <Table.Td>{user.firstName}</Table.Td>
            <Table.Td>{user.lastName}</Table.Td>
            <Table.Td>{user.jobTitle}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
