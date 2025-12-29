import { redirect } from "next/navigation";
import { requireUser } from "../lib/api/auth/requireUser";
import UserInitializer from "./UserInitializer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect("/auth");

  return (
    <>
      <UserInitializer>{children}</UserInitializer>
    </>
  );
}
