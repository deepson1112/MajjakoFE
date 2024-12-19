import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SubMenuType {
  title: string;
  href: string;
  checker: string;
}

interface SideBarNavigationsProps {
  title: string;
  href?: string;
  icons: LucideIcon;
  current: boolean;
  role: number[];
  sub?: SubMenuType[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideBarNavigations = ({
  title,
  current,
  href,
  sub,
  ...link
}: SideBarNavigationsProps) => {
  const currentRoute = usePathname();
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <>
      {sub?.length ? (
        <>
          <li
            key={title}
            className={classNames(
              currentRoute.includes(`${href}`)
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md pl-4 cursor-pointer"
            )}
            onClick={() => setIsSubOpen((prev) => !prev)}
          >
            <div className="flex items-center">
              <link.icons
                className={classNames(
                  currentRoute.includes(`${href}`)
                    ? "text-gray-900"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {title}
            </div>
            {isSubOpen ? <ChevronUp /> : <ChevronDown />}
          </li>
          {/* {isSubOpen && ( */}
          <motion.ul
            animate={
              isSubOpen
                ? {
                    height: "fit-content",
                  }
                : {
                    height: 0,
                  }
            }
            className="pl-12 overflow-hidden"
          >
            {sub.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={classNames(
                  currentRoute.includes(link.checker)
                    ? "bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-500"
                    : " text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-r-md pl-4 mb-2"
                )}
              >
                {link.title}
              </Link>
            ))}
          </motion.ul>
          {/* )} */}
        </>
      ) : (
        <div>
          <Link
            key={title}
            href={href!}
            className={classNames(
              currentRoute === `${href}`
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-4"
            )}
          >
            <link.icons
              className={classNames(
                currentRoute === `${href}`
                  ? "text-gray-900"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-3 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {title}
          </Link>
        </div>
      )}
    </>
  );
};

export default SideBarNavigations;
