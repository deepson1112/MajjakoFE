"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Tab = {
  title: string;
  value: string;
  href: string;
  content?: string | React.ReactNode | any;
};

export const AnimatedTabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  sticky = true,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  sticky?: boolean;
}) => {
  const currentRoute = usePathname();

  // const [active, setActive] = useState<Tab>(propTabs[0]);
  // const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    // setTabs(newTabs);
    // setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    // <div className="sticky top-0">
    <div
      className={cn(
        `${sticky ? "sticky" : "relative"} top-0 ${
          sticky ? "z-20" : "z-0"
        } w-full flex items-center gap-6 bg-gray-100 p-2 rounded-lg overflow-x-auto `,
        containerClassName
      )}
    >
      {propTabs.map((tab, idx) => (
        <Link
          href={tab.href}
          key={tab.title}
          onClick={() => {
            moveSelectedTabToTop(idx);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={cn(
            "bg-gray-100  px-3 py-2 rounded-lg font-semibold min-w-max",
            tabClassName
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {currentRoute === tab.href && (
            <motion.div
              layoutId="clickedbutton"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className={cn(
                "absolute inset-0 bg-white px-3 py-2 rounded-lg font-semibold ",
                activeTabClassName
              )}
            />
          )}

          <span className="relative block text-black">{tab.title}</span>
        </Link>
      ))}
    </div>
    // </div>
  );
};
