import { link } from "fs";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AccountNavigationsProps {
  href: string;
  title: string;
  icons: LucideIcon;
}

const AccountNavigations = ({
  href,
  title,
  ...link
}: AccountNavigationsProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 bg-white py-4 px-2 rounded-lg border"
    >
      <link.icons />
      {title}
    </Link>
  );
};

export default AccountNavigations;
