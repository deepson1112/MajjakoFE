import type { Metadata, Viewport } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/Toaster";
import { UserContextProvider } from "@/lib/useUser";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { IsClientCtxProvider } from "@/lib/isClient/is-client-ctx";
import { Suspense } from "react";
import { Toaster as SonnerToast } from "sonner";
import { ProductProvider } from "./(app-layout)/(mobile)/bazar/(products)/products/[subCategoryId]/[productId]/productProvider";
import FullScreenLoader from "@/components/FullScreenLoader";
import Modal from "@/context/modalContext";
import { CurrencyContextProvider } from "@/lib/useCurrency";
import localFont from "next/font/local";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MajjakoDeals",
  description: "Best Retail Online Shop",
};

export const viewport: Viewport = {
  width: "device-width, shrink-to-fit=no",
  minimumScale: 1,
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
};

// const myFont = localFont({ src: "./fonts/GeneralSans-Regular.otf" });

const myFont = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(myFont.className, "relative")}>
        {/* <body className={cn(myFont.className, "relative")}> */}
        <Providers>
          <ProductProvider>
            <UserContextProvider>
              <CurrencyContextProvider>
                <Modal>
                  <IsClientCtxProvider>
                    <NuqsAdapter>
                      <Suspense fallback={<FullScreenLoader />}>
                        {children}
                      </Suspense>
                    </NuqsAdapter>
                  </IsClientCtxProvider>
                </Modal>
              </CurrencyContextProvider>
            </UserContextProvider>
          </ProductProvider>
        </Providers>
        <SonnerToast richColors duration={3000} expand={true} />
        <Toaster />
        {/* <CookieConsent /> */}
      </body>
    </html>
  );
}
