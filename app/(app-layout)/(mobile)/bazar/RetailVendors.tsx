export const dynamic = "force-dynamic";

import { getRetailersData } from "../api/apiFetchServices";
import Brandcategory from "@/components/bazar/brandcategory";
import { VendorDetails } from "@/types";

const RetailVendors = async () => {
  const retailers = (await getRetailersData()) as VendorDetails[];
  console.log("This is retailers", retailers);
  return retailers.length ? (
    <div className="grid grid-cols-2 mx-1 md:mx-8 lg:grid-cols-4 gap-6">
      {retailers.map((retailer, index) => (
        <Brandcategory
          image={
            retailer?.vendor_cover_image ? retailer.vendor_cover_image : ""
          }
          retailer={retailer.vendor_name}
          key={index}
        />
      ))}
    </div>
  ) : (
    <div className="text-center">
      <h6>No Retails Available</h6>
    </div>
  );
};

export default RetailVendors;
