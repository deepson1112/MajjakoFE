"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CardHeader, CardTitle as CardMainTitle } from "./Card";
import { chooseusicons } from "../icons/chooseus";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200/30 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle index={idx}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-100 border border-transparent relative z-0",
        className
      )}
    >
      <div className="relative z-10">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "w-full font-bold text-3xl md:text-5xl lg:text-6xl capitalize tracking-wider text-center",
        className
      )}
    >
      {title}
    </h1>
  );
};

export const CardHeadingDescription = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "w-full text-slate-900 max-w-lg mx-auto font-medium text-sm capitalize tracking-wide text-center pt-4",
        className
      )}
    >
      {title}
    </p>
  );
};

export const CardTitle = ({
  className,
  children,
  index,
}: {
  className?: string;
  index: number;
  children: React.ReactNode;
}) => {
  const IconComponent = chooseusicons[index]?.icon;
  return (
    <CardHeader className={cn(" flex-row items-center gap-4", className)}>
      <div className="inline-flex justify-center items-center w-12 h-12 rounded-full border-2 bg-brand">
        <IconComponent />
      </div>
      <CardMainTitle>{children}</CardMainTitle>
    </CardHeader>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
