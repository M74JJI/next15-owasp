import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export async function getUserSession() {
  const session = await getServerSession(authOptions as any);
  return session;
}
