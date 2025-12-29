"use client";

import { useEffect } from "react";
import useUserStore from "@/app/auth/stores/UserStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser, me } = useUserStore();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["current-user"],
    queryFn: me,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) setUser(data);
    if (!isLoading && !data) router.replace("/auth");
  }, [data, isSuccess, isLoading, setUser, router]);

  if (isLoading) return <LoadingSpinner />;

  if (!user) return null;

  return <>{children}</>;
}
