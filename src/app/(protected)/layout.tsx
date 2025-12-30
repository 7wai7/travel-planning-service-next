import { redirect } from "next/navigation";
import { requireUser } from "../lib/shared/utils/requireUser";
import UserInitializer from "./UserInitializer";
import SideBar from "../components/SideBar";
import TripModal from "../components/TripModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect("/auth");

  return (
    <>
      <UserInitializer>
        <main className="ml-50 py-6 px-8 w-full flex flex-col">{children}</main>
        <SideBar />
        <TripModal />
        <ConfirmDialog />
      </UserInitializer>
    </>
  );
}
