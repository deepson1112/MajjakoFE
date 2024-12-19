import { Suspense } from "react";

const LocationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
};

export default LocationLayout;
