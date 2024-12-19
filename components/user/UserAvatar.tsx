import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Image from "next/image";
import { UserEntity, UserEntityMe } from "@/types/models";

interface UserAvatarProps extends AvatarProps {
  user: Pick<UserEntityMe, "first_name" | "profile_picture" | "email">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user?.profile_picture ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.profile_picture as string}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span>
            {user.first_name ? user?.first_name.charAt(0).toUpperCase() : "G"}
          </span>
          {/* <span className="sr-only">{user?.first_name}</span> */}
          {/* <Icons.user className="h-4 w-4" /> */}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
