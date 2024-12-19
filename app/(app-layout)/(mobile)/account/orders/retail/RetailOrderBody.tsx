import React from "react";
import { RetailOrderConfirmation } from "../retail-orders/[order_id]/page";
import Price from "@/components/Price";

interface FoodItem {
  food_title: string;
  price: number;
  order_food_addons?: {
    customization: {
      title: string;
      price: number;
    };
  }[];
}

interface Order {
  food_item: FoodItem;
  quantity: number;
}

interface OrderVendor {
  ordered_food: Order[];
}

interface Data {
  order_vendor: OrderVendor[];
}

interface RetailOrderBodyProps {
  data: RetailOrderConfirmation;
}

const RetailOrderBody = ({ data }: RetailOrderBodyProps) => {
  return (
    <>
      {
        data &&
          data.retail_order_vendor.map((retail_order) =>
            retail_order.ordered_product_details.map((order, index) => (
              <tr
                key={`retail-order-${index}`}
                className="border-b border-slate-200"
              >
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className=" flex flex-col font-bold text-sm text-slate-700">
                    <p>{order.retail_product_variation_details.product.name}</p>

                    <p className="text-sm font-normal">
                      {order.retail_product_variation_details.variation
                        .map(
                          (item) =>
                            ` ${item.variation_type_name}: ${item.variation_name} `
                        )
                        .join(",")}
                    </p>
                  </div>
                  <div className="mt-0.5 text-slate-500 sm:hidden">
                    {order.quantity} Qty
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {order.quantity} Qty
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0 flex flex-col items-end">
                  {order.discount_amount ? (
                    <span className="flex items-center gap-1 text-end">
                      <span className="line-through font-thin">
                        <Price amount={order.price} />
                      </span>
                      <span className="text-sm font-semibold">
                        <Price amount={order.discounted_amount} />
                      </span>
                    </span>
                  ) : (
                    <Price amount={order.price} />
                  )}
                  <div className=" flex flex-col text-sm text-slate-500">
                    <p className="text-xs font-semibold">
                      ({order.tax_exclusive_amount} + {order.tax_amount} tax)
                    </p>
                  </div>
                </td>
              </tr>
            ))
          )

        // data.cart_data.vendors.map((foodVendor, i) =>
        //   foodVendor.items.map((order, index) => (
        //     <tr key={index} className="border-b border-slate-200">
        //       <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
        //         <div className=" flex flex-col font-bold text-sm text-slate-700">
        //           <p>
        //             {order.retail_product_variation.product[0].product_name ||
        //               "No Title"}
        //           </p>

        //           <p className="text-sm font-normal">
        //             {order.retail_product_variation.variation
        //               .map(
        //                 (item) =>
        //                   ` ${item.variation_type_name}: ${item.variation_name} `
        //               )
        //               .join(",")}
        //           </p>
        //         </div>
        //         <div className="mt-0.5 text-slate-500 sm:hidden">
        //           {order.quantity} Qty
        //         </div>
        //       </td>
        //       <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
        //         {order.quantity} Qty
        //       </td>
        //       <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0 flex flex-col items-end">
        //         {order.retail_product_variation.discounted_amount ? (
        //           <span className="flex items-center gap-1 text-end">
        //             <span className="line-through font-thin">
        //               {`$${order.retail_product_variation.price}`}
        //             </span>
        //             <span className="text-sm font-semibold">
        //               {`$${order.retail_product_variation.discounted_amount}`}
        //             </span>
        //           </span>
        //         ) : (
        //           `$${order.retail_product_variation.price}`
        //         )}
        //         <div className=" flex flex-col text-sm text-slate-500">
        //           <p className="text-xs font-semibold">
        //             ({order.retail_product_variation.tax_exclusive_price} +{" "}
        //             {order.retail_product_variation.tax_amount} tax)
        //           </p>
        //         </div>
        //       </td>
        //     </tr>
        //   ))
        // )
      }
    </>
  );
};

export default RetailOrderBody;
