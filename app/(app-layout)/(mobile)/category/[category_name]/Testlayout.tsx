import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Props {
  children: React.ReactNode;
}

const CategoryLayout = ({ children }: Props) => {
  // const { user } = useUser();
  // const router = useRouter();

  // if (!user) return router.push("/sign-in");

  return (
    <>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </>
  );
};

export default CategoryLayout;
