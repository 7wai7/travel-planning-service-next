"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
    <main className="max-w-2xl mt-40 mx-auto px-2 flex flex-col">
      <h1 className="text-black text-3xl mb-2">Welcome to Travel Planning Service</h1>

      <p className="text-gray-500 text-lg mb-6">
        Plan your trips, organize places by day, and collaborate with others —
        all in one simple and intuitive interface.
      </p>

      <div className="flex flex-row gap-10 justify-center w-full">
        <Link href="/trips" className="py-2 px-6 bg-blue-50 hover:bg-blue-200 border border-blue-200 hover:border-blue-600 text-blue-600 text-center font-sans rounded-lg transition-colors duration-200 ease">
        View my trips
      </Link>
      <Link href="/auth" className="py-2 px-6 bg-green-50 hover:bg-green-200 border border-green-200 hover:border-green-600 text-green-600 text-center font-sans rounded-lg transition-colors duration-200 ease">
        Login
      </Link>
      </div>
    </main>
    </>
  );
}
