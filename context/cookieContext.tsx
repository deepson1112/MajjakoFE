"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CookieIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function CookieConsent({
  fired = false,
  onAcceptAllCallback = () => {},
  onAcceptRequiredCallback = () => {},
}) {
  const nextYear = new Date().getFullYear() + 1;
  const expirationDate = new Date(
    `January 1, ${nextYear} 00:00:00 GMT`
  ).toUTCString();
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const acceptAll = () => {
    setIsOpen(false);
    document.cookie = `_ck_ct=0; expires=${expirationDate}`;
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptAllCallback();
  };

  const acceptRequired = () => {
    setIsOpen(false);
    document.cookie = `_ck_ct=1; expires=${expirationDate}`;
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptRequiredCallback();
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (
        document.cookie.includes("_ck_ct=0") ||
        document.cookie.includes("_ck_ct=1")
      ) {
        if (!fired) {
          setIsOpen(false);
          setTimeout(() => {
            setHide(true);
          }, 700);
        }
      }
    } catch (e) {}
  }, [fired]);

  return (
    <div
      className={cn(
        "fixed z-[100] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full max-w-sm sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <div className="dark:bg-secondary bg-background rounded-md m-3 border border-border shadow-lg dark:shadow-none">
        <div className="grid gap-2">
          <div className="border-b border-border dark:border-background/20 h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking &quot;
                <span className="font-medium opacity-80">Accept All</span>, you
                agree to our use of cookies.
              </span>
              <br />
              <a href="#" className="text-xs underline">
                Learn more.
              </a>
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={acceptAll} className="w-full">
              Accept All
            </Button>
            <Button onClick={acceptRequired} className="w-full" variant="ghost">
              Accept Essential Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
