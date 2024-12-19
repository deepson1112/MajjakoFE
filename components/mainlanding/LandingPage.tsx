import { Suspense } from "react";
import BazarSection from "./BazarSection";
import LandingHeader from "./LandingHeader";

const LandingPage = () => {
  return (
    <>
      <LandingHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <BazarSection />
      </Suspense>
    </>
  );
};

export default LandingPage;
