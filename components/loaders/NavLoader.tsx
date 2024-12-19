import React from "react";
import { Skeleton } from "../ui/Skeleton";

const NavLoader = ({ activeLandingPage }: { activeLandingPage: boolean }) => {
  return (
    <header className={activeLandingPage ? "bg-brand" : "bg-white"}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Skeleton className="w-[3.5rem] h-[3.5rem] rounded-full" />
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Skeleton className="w-[280px] h-[30px] rounded-md" />
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="flex items-center gap-3">
            <Skeleton className="w-[80px] h-[30px] rounded-md" />
            <Skeleton className="w-[80px] h-[30px] rounded-md" />
          </div>
        </div>

        <div className="flex lg:hidden">
          <Skeleton className="w-[80px] h-[30px] rounded-md" />
        </div>
      </nav>
      {/* <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src="/final.png"
                alt="chow chow express logo"
                width={500}
                height={500}
              />
            </a>
            <a
              href="#"
              className="ml-auto rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:to-brand_hover"
            >
              Sign up
            </a>
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
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
};

export default NavLoader;
