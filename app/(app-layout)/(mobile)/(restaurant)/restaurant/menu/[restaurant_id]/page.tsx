export const dynamic = "force-dynamic";

import { getResturantsMenu } from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import { Suspense, useRef } from "react";
import MenuContainer from "../MenuContainer";

interface Props {
  params: {
    restaurant_id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: Props) => {
  const { restaurant_id } = params;
  const queryParam = searchParams ? searchParams : null;
  const foodid = queryParam?.food?.toString().toLowerCase()!;
  const menus = await getResturantsMenu(restaurant_id);
  return (
    <Suspense fallback={<p>Loading Menu...</p>}>
      <MenuContainer menus={menus} />
    </Suspense>
  );
};

export default page;
