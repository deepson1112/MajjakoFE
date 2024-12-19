import { Suspense } from "react";

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </>
  );
}
