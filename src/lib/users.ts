export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export const users = [
  {
    id: "user1",
    email: "admin@example.com",
    password: "adminpass",
    role: "admin",
  },
  {
    id: "user2",
    email: "user@example.com",
    password: "userpass",
    role: "user",
  },
  { id: "3", name: "Alice", email: "alice@example.com", role: "user" },
  { id: "4", name: "Bob", email: "bob@example.com", role: "admin" },
];
