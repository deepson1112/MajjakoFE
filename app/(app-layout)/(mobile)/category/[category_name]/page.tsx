export const dynamic = "force-dynamic";

import { Suspense } from "react";
import {
  getResturantsData,
  getVendorCategories,
} from "../../api/apiFetchServices";

import { VendorCategoryType } from "@/types";
import MenuContainer from "../../(restaurant)/restaurant/menu/MenuContainer";

interface Props {
  params: {
    category_name: string;
  };
}

const CategoryMenuPage = async ({ params }: Props) => {
  const { category_name } = params;
  const category: VendorCategoryType[] = await getVendorCategories();
  const vendors = await getResturantsData();
  const menus = category.filter((item) => item.category_name === category_name);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MenuContainer menus={menus} vendors={vendors} />
    </Suspense>
  );
};

export default CategoryMenuPage;
