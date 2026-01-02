"use server";

import { cookies } from "next/headers";
import Link from "next/link";
import { requireUser } from "../lib/shared/utils/requireUser";

export default async function SideBar() {
  const user = await requireUser();

  const logout = async () => {
    "use server";
    (await cookies()).delete("token");
  }

  return (
    <section className="w-50 fixed top-0 bottom-0 left-0 right-auto overflow-y-auto bg-white shadow-(--shadow) py-4 px-4 border-r border-r-gray-100">
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className="interact bg-blue-50 py-0.5 px-2 text-blue-800"
        >
          Main
        </Link>
        <Link
          href={"/trips"}
          className="interact bg-blue-50 py-0.5 px-2 text-blue-800"
        >
          My trips
        </Link>
      </nav>
      <hr className="my-4" />
      <p className="text-(--muted) text-xs">Profile</p>
      <div>
        <p className="text-sm text-black">{user?.username ?? "<Not found>"}</p>
        <p className="text-xs text-black font-semibold">
          {user?.email ?? "<Not found>"}
        </p>
      </div>
      <button
        className="interact text-sm border-blue-300 hover:border-blue-500 mt-2 text-blue-500 py-0.5 w-full"
        onClick={logout}
      >
        Logout
      </button>
    </section>
  );
}
