"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { ChevronDownIcon, Heart } from "lucide-react";
import useUser from "@/lib/useUser";
import { UserAccountNav } from "../user/UserAccountNav";
import GlobalFilter from "../ui/GlobalFilter";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Skeleton } from "../ui/Skeleton";
import { SideCart } from "../sidecart/SideCart";
import { SignOutModal } from "../SignOutModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const userNavigation = [
  { name: "Home", href: "/" },
  { name: "Bazar", href: "/bazar" },
  { name: "Contact", href: "/contact" },
  { name: "Request Product", href: "/request-product" },
  { name: "Our Mission", href: "/ourmission" },
  { name: "FAQs", href: "/faqs" },
];

export default function LandingNavbar() {
  const currentRoute = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useUser();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <div
      className={cn(
        currentRoute === "/" ? "px-0" : "hidden px-0",
        "bg-brand",
        "sticky top-0 max-h-fit"
      )}
    >
      <MaxWidthWrapper>
        {isLoading ? (
          <header className="bg-brand">
            <nav
              className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <Skeleton className="bg-black/25 w-[3.5rem] h-[3.5rem] rounded-full" />
              </div>

              <div className="hidden lg:flex lg:gap-x-12">
                <Skeleton className="bg-black/25 w-[180px] h-[30px] rounded-md" />
              </div>

              <div className="flex flex-1 items-center justify-end gap-x-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="bg-black/25 w-[80px] h-[30px] rounded-md" />
                  <Skeleton className="bg-black/25 w-[80px] h-[30px] rounded-md" />
                </div>
              </div>

              <div className="flex lg:hidden">
                <Skeleton className="bg-black/25 w-[80px] h-[30px] rounded-md" />
              </div>
            </nav>
          </header>
        ) : (
          <Fragment>
            <header className="md:block hidden :bg-[#fe5900] sticky top-0 w-full z-10">
              <nav
                className="flex items-center justify-between gap-x-6 py-6"
                aria-label="Global"
              >
                <div className="hidden md:flex lg:flex-1">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">MajjakoDeals logo</span>
                    <Image
                      className="h-14 w-auto"
                      src="/final-white.svg"
                      alt="Majjakodeals-logo"
                      width={1563}
                      height={1563}
                    />
                  </Link>
                </div>

                <GlobalFilter />

                {/* <div className="hidden lg:flex lg:gap-x-12">
                {user?.role === 1 && user?.vendor_type === 2
                  ? retailNavigations.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={
                          currentRoute === link.href
                            ? "text-md tracking-widest font-bold leading-6 h-full text-brand outline-b-4 outline-brand"
                            : "text-md font-bold tracking-widest leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200"
                        }
                      >
                        {link.name}
                      </Link>
                    ))
                  : user?.role === 1 && user?.vendor_type === 1
                  ? vendorNavigation.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={
                          currentRoute === link.href
                            ? "text-md tracking-wider font-bold leading-6 h-full text-brand outline-b-4 outline-brand"
                            : "text-md font-bold tracking-wider leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200"
                        }
                      >
                        {link.name}
                      </Link>
                    ))
                  : userNavigation.slice(0, 3).map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={
                          currentRoute === link.href
                            ? "text-md font-semibold tracking-wider  leading-6 h-full text-brand outline-b-4 outline-brand"
                            : "text-md font-semibold tracking-wider leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200"
                        }
                      >
                        {link.name}
                      </Link>
                    ))}
              </div> */}

                <div className="hidden md:flex flex-1 items-center justify-end gap-x-6">
                  {!!user ? (
                    <div className="flex items-center gap-8">
                      <Link href={"/bazar/wishlists"}>
                        <Heart className="text-white" />
                      </Link>

                      <SideCart />

                      <UserAccountNav
                        session={user}
                        setIsSignOutModalOpen={setIsSignOutModalOpen}
                        isSignOutModalOpen={isSignOutModalOpen}
                      />
                    </div>
                  ) : (
                    <Fragment>
                      <Link
                        href="/sign-in"
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "text-white hover:bg-white/50"
                        )}
                      >
                        Sign In
                      </Link>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button
                            className={cn(
                              buttonVariants({ variant: "default" }),
                              "bg-white text-brand hover:bg-white/70"
                            )}
                          >
                            Sign Up
                            <ChevronDownIcon
                              className="-mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/sign-up/user"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm rounded-sm hover:bg-red-200 hover:text-red-800 hover:no-underline"
                                    )}
                                  >
                                    As User
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/sign-up/vendor"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm rounded-sm hover:bg-red-200 hover:text-red-800 hover:no-underline"
                                    )}
                                  >
                                    As Vendor
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </Fragment>
                  )}
                </div>

                <div className="flex">
                  {/* <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button> */}
                </div>
              </nav>

              <Dialog
                as="div"
                className="lg:hidden z-[100]"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
              >
                <div className="fixed inset-0 z-100" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-[100] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center gap-x-6 justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Your Company</span>
                      <Image
                        className="h-8 w-auto"
                        src="/final.svg"
                        alt="majjakodeals logo"
                        width={500}
                        height={500}
                      />
                    </a>
                    {/* <a
                    href="#"
                    className="ml-auto rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:to-brand_hover"
                  >
                    Sign upss
                  </a> */}
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="flex flex-col gap-y-3 space-y-2 py-6">
                        {/* {user?.role === 1 && user?.vendor_type === 2
                        ? retailNavigations.map((link) => (
                            <Link
                              onClick={() => setMobileMenuOpen(false)}
                              key={link.name}
                              href={link.href}
                              className={
                                currentRoute === link.href
                                  ? "text-sm font-semibold leading-6 h-full text-brand outline-b-4 outline-brand bg-orange-50 p-2 rounded-md"
                                  : "text-sm font-semibold leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200 p-2 rounded-md"
                              }
                            >
                              {link.name}
                            </Link>
                          ))
                        : user?.role === 1 && user?.vendor_type === 1
                        ? vendorNavigation.map((link) => (
                            <Link
                              onClick={() => setMobileMenuOpen(false)}
                              key={link.name}
                              href={link.href}
                              className={
                                currentRoute === link.href
                                  ? "text-sm font-semibold leading-6 h-full text-brand outline-b-4 outline-brand bg-orange-50 p-2 rounded-md"
                                  : "text-sm font-semibold leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200 p-2 rounded-md"
                              }
                            >
                              {link.name}
                            </Link>
                          ))
                        : userNavigation.map((link) => (
                            <Link
                              onClick={() => setMobileMenuOpen(false)}
                              key={link.name}
                              href={link.href}
                              className={
                                currentRoute === link.href
                                  ? "text-sm font-semibold leading-6 h-full text-brand outline-b-4 outline-brand bg-orange-50 p-2 rounded-md"
                                  : "text-sm font-semibold leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200 p-2 rounded-md"
                              }
                            >
                              {link.name}
                            </Link>
                          ))} */}
                        {userNavigation.map((link) => (
                          <Link
                            onClick={() => setMobileMenuOpen(false)}
                            key={link.name}
                            href={link.href}
                            className={
                              currentRoute === link.href
                                ? "text-sm font-semibold leading-6 h-full text-white outline-b-4 outline-brand bg-orange-50 p-2 rounded-md"
                                : "text-sm font-semibold leading-6 h-full text-gray-900 hover:text-gray-500 hover:outline-b-2 hover:outline-gray-200 p-2 rounded-md"
                            }
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>

                      {/* <div className="py-6">
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </a>
                    </div> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </header>
          </Fragment>
        )}
        <SignOutModal
          isSignOutModalOpen={isSignOutModalOpen}
          setIsSignOutModalOpen={setIsSignOutModalOpen}
          contents="You Sure want to sign out from the application?"
        />
      </MaxWidthWrapper>
    </div>
  );
}
