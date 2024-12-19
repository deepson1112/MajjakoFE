"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navigation, retailnavigation, userNavigation } from "@/lib/Constants";
import SideBarNavigations from "./SideBarNavigations";
import useUser from "@/lib/useUser";
import { Skeleton } from "@/components/ui/Skeleton";
import { ChevronLeft, LogOut } from "lucide-react";
import { SignOutModal } from "@/components/SignOutModal";
import RouterBack from "./orders/retail-orders/[order_id]/RouterBack";

export default function AccountOption({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useUser();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return isLoading ? (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-9 rounded-md" />
      <Skeleton className="w-full h-9 rounded-md" />
      <Skeleton className="w-full h-9 rounded-md" />
      <Skeleton className="w-full h-9 rounded-md" />
      <Skeleton className="w-full h-9 rounded-md" />
    </div>
  ) : (
    <>
      <div className="lg:top-0 lg:left-0 lg:flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white z-[100]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-24">
                    <nav className="mt-5 space-y-1 px-2">
                      <>
                        {user?.role === 2
                          ? userNavigation.map((link) =>
                              link.role.includes(user?.role!) ? (
                                <SideBarNavigations
                                  {...link}
                                  key={link.title}
                                />
                              ) : null
                            )
                          : user?.vendor_type === 2
                          ? retailnavigation.map((link) =>
                              link.role.includes(user?.role!) ? (
                                <SideBarNavigations
                                  {...link}
                                  key={link.title}
                                />
                              ) : null
                            )
                          : navigation.map((link) =>
                              link.role.includes(user?.role!) ? (
                                <SideBarNavigations
                                  {...link}
                                  key={link.title}
                                />
                              ) : null
                            )}
                        <li
                          className={
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-4 cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                          onClick={() => setIsSignOutModalOpen((prev) => !prev)}
                        >
                          <LogOut className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
                          Sign Out
                        </li>
                      </>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0"></div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:relative lg:inset-y-0 lg:flex lg:w-72 lg:flex-col ">
          <div className="flex flex-1 flex-col bg-white ">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                <>
                  {user?.role === 2
                    ? userNavigation.map((link) =>
                        link.role.includes(user?.role!) ? (
                          <SideBarNavigations {...link} key={link.title} />
                        ) : null
                      )
                    : user?.vendor_type === 2
                    ? retailnavigation.map((link) =>
                        link.role.includes(user?.role!) ? (
                          <SideBarNavigations {...link} key={link.title} />
                        ) : null
                      )
                    : navigation.map((link) =>
                        link.role.includes(user?.role!) ? (
                          <SideBarNavigations {...link} key={link.title} />
                        ) : null
                      )}
                  <li
                    className={
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-4 cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    onClick={() => setIsSignOutModalOpen((prev) => !prev)}
                  >
                    <LogOut className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" />
                    Sign Out
                  </li>
                </>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col ">
          <div className="sticky top-0 z-20 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 hidden  md:grid lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <RouterBack>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1">Back</span>
            </RouterBack>
          </div>

          <main className="flex-1">
            <div className="py-3 md:py-6">
              <div className="overflow-hidden px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <SignOutModal
        isSignOutModalOpen={isSignOutModalOpen}
        setIsSignOutModalOpen={setIsSignOutModalOpen}
        contents="You Sure want to sign out from the application?"
      />
    </>
  );
}
