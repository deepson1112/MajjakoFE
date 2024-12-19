import { api } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { NotificationsType } from "@/types";
import { Bell, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const NotificationsBell = ({
  activeLandingPage,
  isMobile,
}: {
  activeLandingPage: boolean;
  isMobile?: boolean;
}) => {
  const { data: notificatoins, isLoading: notificatoinsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/user/notification/")
        .json<{ unseen_count: number; results: NotificationsType[] }>();
      return response;
    },
    queryKey: ["user-notification"],
    retry: false,
  });
  return notificatoinsLoader ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    <Link href={"/notification"} className="relative">
      <Bell
        className={
          isMobile ? "text-white" : activeLandingPage ? "text-white" : ""
        }
      />
      <span
        className={cn(
          isMobile
            ? "text-brand bg-white"
            : activeLandingPage
            ? "bg-white text-brand"
            : "bg-brand text-white",
          "h-4 w-4 rounded-full  absolute -top-1 -right-[0.35rem] grid place-items-center text-xs"
        )}
      >
        {(notificatoins && notificatoins?.unseen_count) || "0"}
      </span>
    </Link>
  );
};

export default NotificationsBell;
