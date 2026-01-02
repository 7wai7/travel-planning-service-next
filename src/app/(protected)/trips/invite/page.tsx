"use server";

import { TripsService } from "@/app/api/lib/services/trips.service";
import { requireUser } from "@/app/lib/shared/utils/requireUser";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TripAccessPage({ searchParams }: Props) {
  const user = await requireUser();
  const query = await searchParams;

  const token = Array.isArray(query.token)
    ? query.token[0]
    : query.token;

  let state: { status: "success" } | { status: "error"; message: string };

  try {
    if(!user) throw new Error("user not found");
    if(!token) throw new Error("token not found");

    await TripsService.invite(user.id, token);
    state = { status: "success" };
  } catch (e: unknown) {
    console.error(e);

    state = {
      status: "error",
      message:
        e instanceof Error
          ? e.message
          : "Invitation link is invalid, expired or already used.",
    };
  }

  return (
    <section className="max-w-xl mx-auto mt-16 rounded-2xl border p-6 bg-white">
      {state.status === "success" ? (
        <>
          <h2 className="text-2xl font-semibold text-black mb-4">
            Welcome to the journey
          </h2>
          <p className="text-green-600">
            You have been successfully added to the trip.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-black mb-4">
            Invitation error
          </h2>
          <p className="text-red-500 text-sm">{state.message}</p>
        </>
      )}
    </section>
  );
}
