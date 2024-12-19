export const dynamic = "force-dynamic";

import {
  getBazarPageContents,
  getRetailVendors,
} from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { BazarCategoires } from "@/app/(app-layout)/(mobile)/bazar/BazarCategoires";
import BazarOffers from "@/app/(app-layout)/(mobile)/bazar/BazarOffers";
import BazarPromotion from "@/app/(app-layout)/(mobile)/bazar/BazarPromotion";
import BazarCategoiresList from "@/app/(app-layout)/(mobile)/bazar/BazarCategoiresList";
import GiftNowBanner from "@/app/(app-layout)/(mobile)/bazar/GiftNowBanner";
import Ocassions from "@/app/(app-layout)/(mobile)/bazar/Ocassions";
import BazarFeaturedProducts from "@/app/(app-layout)/(mobile)/bazar/BazarFeaturedProducts";
import BazarVendors from "@/app/(app-layout)/(mobile)/bazar/BazarVendors";
import BazarSpecial from "@/app/(app-layout)/(mobile)/bazar/BazarSpecial";
import { BazarProducts } from "@/app/(app-layout)/(mobile)/bazar/BazarProducts";

export type Content = {
  id: number;
  image: string;
  title_text: string | null;
  button_text: string | null;
  hyperlink: string;
  is_active: boolean;
  description: string | null;
  section_code: number;
  category_group_detail: {
    id: number;
    group_name: string;
    created_at: string;
    updated_at: string;
    category: number[];
  } | null;
  platform_offer: {
    id: number;
    audience: string;
    offer_name: string;
    start_date: string;
    end_date: string;
    active: boolean;
    discount_banner: string;
    created_date: string;
    disabled: false;
    created_by: number;
  } | null;
};

export type Section = {
  id: number;
  content: Content[];
  section_code: string;
  section_name: string;
};

export type Vendor = {
  id: number;
  free_delivery: any[];
  customer_type: string;
  get_one_for_free: any[];
  save_on_items: any[];
  store_offer: any[];
  vendor_type_display: string;
  vendor_name: string;
  vendor_slug: string;
  vendor_license: string;
  vendor_description: string | null;
  vendor_phone: string;
  is_approved: boolean;
  created_at: string;
  modified_at: string;
  tax_rate: number;
  tax_exempt: boolean;
  age_restriction: boolean;
  vendor_cover_image: string;
  vendor_logo: string | null;
  vendor_location: string;
  vendor_location_latitude: string;
  vendor_location_longitude: string;
  profile_setup: boolean;
  vendor_type: number;
  user: number;
  user_profile: number;
  offerings: number[];
};

export default async function BazarSection() {
  const bazarPageContents = (await getBazarPageContents()) as Section[];
  const retails = (await getRetailVendors()) as Vendor[];

  return (
    <>
      {bazarPageContents &&
      !!bazarPageContents.find((item) => item.section_code === "005") ? (
        <BazarFeaturedProducts
          contents={bazarPageContents.find(
            (item) => item.section_code === "005"
          )}
        />
      ) : null}

      <MaxWidthWrapper className="space-y-8 py-3">
        <BazarCategoires limit={16} />

        {bazarPageContents &&
        !!bazarPageContents.find((item) => item.section_code === "001") ? (
          <BazarOffers
            contents={bazarPageContents.find(
              (item) => item.section_code === "001"
            )}
          />
        ) : null}

        <BazarProducts />

        <BazarPromotion />

        {/* {bazarPageContents &&
        !!bazarPageContents.find((item) => item.section_code === "002") ? (
          <BazarCategoiresList
            contents={bazarPageContents.find(
              (item) => item.section_code === "002"
            )}
          />
        ) : null} */}

        {bazarPageContents &&
        !!bazarPageContents.find((item) => item.section_code === "003") ? (
          <GiftNowBanner
            contents={bazarPageContents.find(
              (item) => item.section_code === "003"
            )}
          />
        ) : null}

        {bazarPageContents &&
        !!bazarPageContents.find((item) => item.section_code === "004") ? (
          <Ocassions
            contents={bazarPageContents.find(
              (item) => item.section_code === "004"
            )}
          />
        ) : null}

        {retails && retails.length ? <BazarVendors retails={retails} /> : null}

        {bazarPageContents &&
        !!bazarPageContents.find((item) => item.section_code === "006") ? (
          <BazarSpecial
            contents={bazarPageContents.find(
              (item) => item.section_code === "006"
            )}
          />
        ) : null}
      </MaxWidthWrapper>
    </>
  );
}
