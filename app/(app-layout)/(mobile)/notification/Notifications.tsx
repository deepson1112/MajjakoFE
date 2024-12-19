// "use client";
// import { Skeleton } from "@/components/ui/Skeleton";
// import { api } from "@/lib/fetcher";
// import { queryClient } from "@/lib/queryClient";
// import { capitalizeWord, formatTimeToNow } from "@/lib/utils";
// import { NotificationsType } from "@/types";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery } from "react-query";

// const Notifications = () => {
//   const router = useRouter();
//   const { data: userNotifications, isLoading: userNotificationsLoader } =
//     useQuery({
//       queryFn: async () => {
//         const response = await api()
//           .get("/user/notification/")
//           .json<{ unseen_count: number; results: NotificationsType[] }>();
//         return response;
//       },
//       queryKey: ["user-notification"],
//       retry: false,
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//     });

//   const {
//     mutate: handleSeeUserNotification,
//     isLoading: handleSeeUserNotificationLoader,
//   } = useMutation({
//     mutationFn: async (id: number) => {
//       const response = await api()
//         .get(`/user/notification/${id}`)
//         .json<{ unseen_count: number; results: NotificationsType[] }>();
//       return response;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries("user-notification");
//     },
//   });

//   return userNotificationsLoader ? (
//     <ul className="space-y-6 my-5">
//       {Array.from({ length: 3 }).map((_, i) => (
//         <Skeleton
//           key={`notification-skeleton-loader-${i}`}
//           className="h-72 w-full rounded-2xl"
//         />
//       ))}
//     </ul>
//   ) : !!userNotifications?.results?.length ? (
//     <ul className="space-y-6 my-5">
//       {userNotifications.results.map((notification) => (
//         <li
//           className="w-full border rounded-2xl py-3 px-3 md:px-6 shadow-sm space-y-2 cursor-pointer hover:bg-gray-50"
//           key={`notification-link-${notification.title}`}
//           onClick={() => {
//             router.push(notification.link);
//             handleSeeUserNotification(notification.id);
//           }}
//         >
//           <h4 className="font-semibold text-brand">{notification.title}</h4>
//           <span className="text-gray-400 text-xs">
//             Added {formatTimeToNow(notification.created_at as unknown as Date)}
//           </span>
//           {!!notification?.image ? (
//             <Image
//               src={notification?.image || ""}
//               alt={notification.title}
//               width={1000}
//               height={1000}
//               className="w-full h-72 object-cover object-center rounded-2xl"
//             />
//           ) : null}

//           <p className="text-gray-500 text-sm">
//             {capitalizeWord(notification.message)}
//           </p>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <div className="py-64">
//       <h6 className="text-gray-800 text-center">No Notifications</h6>
//     </div>
//   );
// };

// export default Notifications;
"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/fetcher";
import { queryClient } from "@/lib/queryClient";
import { capitalizeWord, formatTimeToNow } from "@/lib/utils";
import { NotificationsType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

const Notifications = () => {
  const router = useRouter();
  const { data: userNotifications, isLoading: userNotificationsLoader } =
    useQuery({
      queryFn: async () => {
        const response = await api()
          .get("/user/notification/")
          .json<{ unseen_count: number; results: NotificationsType[] }>();
        return response;
      },
      queryKey: ["user-notification"],
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const {
    mutate: handleSeeUserNotification,
    isLoading: handleSeeUserNotificationLoader,
  } = useMutation({
    mutationFn: async (id: number) => {
      const response = await api()
        .get(`/user/notification/${id}`)
        .json<{ unseen_count: number; results: NotificationsType[] }>();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user-notification");
    },
  });

  return userNotificationsLoader ? (
    <ul className="space-y-6 my-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={`notification-skeleton-loader-${i}`}
          className="h-24 w-full rounded-2xl"
        />
      ))}
    </ul>
  ) : !!userNotifications?.results?.length ? (
    <ul className="space-y-6 my-5">
      {userNotifications.results.map((notification) => (
        <li
          className="w-full border rounded-2xl py-3 px-3 md:px-6 shadow-sm cursor-pointer hover:bg-gray-50 flex items-start gap-4"
          key={`notification-link-${notification.title}`}
          onClick={() => {
            router.push(notification.link);
            handleSeeUserNotification(notification.id);
          }}
        >
          {!!notification?.image && (
            <div className="flex-shrink-0">
              <Image
                src={notification.image}
                alt={notification.title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover object-center rounded-lg"
              />
            </div>
          )}
          <div className="flex-grow space-y-2">
            <h4 className="font-semibold text-brand">{notification.title}</h4>
            <span className="text-gray-400 text-xs block">
              Added{" "}
              {formatTimeToNow(notification.created_at as unknown as Date)}
            </span>
            <p className="text-gray-500 text-sm">
              {capitalizeWord(notification.message)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="py-64">
      <h6 className="text-gray-800 text-center">No Notifications</h6>
    </div>
  );
};

export default Notifications;
