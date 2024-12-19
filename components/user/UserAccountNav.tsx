"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { UserAvatar } from "@/components/user/UserAvatar";
import { UserEntity } from "@/types/models";
import { Dispatch, SetStateAction } from "react";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  session: UserEntity;
  isSignOutModalOpen: boolean;
  setIsSignOutModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function UserAccountNav({
  session,
  isSignOutModalOpen,
  setIsSignOutModalOpen,
}: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            first_name: session.first_name,
            email: session.email,
            profile_picture: session.profile_picture || null,
          }}
          className="h-8 w-8 border outline outline-brand outline-offset-4"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {session.first_name && (
              <p className="font-medium">{session.first_name}</p>
            )}
            {session.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/bazar/watchlists">Watchlists</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/bazar/wishlists/">My Wishlists</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/bazar/watchlists/">My Watchlists</Link>
        </DropdownMenuItem> */}
        {session && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link
              href={
                session?.role === 1 && session?.vendor_type === 2
                  ? "/account/retail/dashboard"
                  : session?.role === 1 && session?.vendor_type === 1
                  ? "/account/dashboard"
                  : "/account/my-order"
              }
            >
              Account
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => {
            setIsSignOutModalOpen(!isSignOutModalOpen);
          }}
        >
          Sign out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
