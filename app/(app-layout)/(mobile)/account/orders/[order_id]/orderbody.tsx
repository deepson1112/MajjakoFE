import Price from "@/components/Price";
import React from "react";
import { RetailOrderConfirmation } from "../retail-orders/[order_id]/page";

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

interface Props {
  data: RetailOrderConfirmation;
}

const OrderBody: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data.order_vendor &&
        data.order_vendor.map(
          (foodVendor, i) =>
            foodVendor.ordered_food.length > 0 &&
            foodVendor.ordered_food.map((order, index) => (
              <tr key={index} className="border-b border-slate-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className=" flex flex-col font-bold text-sm text-slate-700">
                    <p>{order.food_item.food_title || "No Title"}</p>
                    {order.food_item.order_food_addons?.map((addon, ind) => (
                      <p className="text-sm font-normal" key={ind}>
                        {addon.customization.title}
                      </p>
                    ))}
                  </div>
                  <div className="mt-0.5 text-slate-500 sm:hidden">
                    {order.quantity} Qty
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                  {order.quantity} Qty
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                  <Price amount={order.food_item.price} /> each
                  <div className=" flex flex-col text-sm text-slate-500">
                    {order.food_item.order_food_addons?.map((addon, ind) => (
                      <p className="text-sm" key={ind}>
                        +<Price amount={addon.customization.price} />
                      </p>
                    ))}
                  </div>
                </td>
              </tr>
            ))
        )}
    </>
  );
};

export default OrderBody;
