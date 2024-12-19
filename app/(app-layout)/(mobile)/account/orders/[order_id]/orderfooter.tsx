import Price from "@/components/Price";
import { RetailOrderConfirmation } from "../retail-orders/[order_id]/page";

export interface OrderDetails {
  first_name: string;
  last_name: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  created_at: string;
  order_number: string;
  delivery_date?: string;
  total: number;
  delivery_charge: number;
  total_tax: number;
  tip?: number;
  loyalty_points_received?: number;
  cart_data: {
    total: number;
    subtotal: number;
    "loyalty-discount-amount": number | null;
    discount: number | null;
    "coupon-discount": number | null;
  };
  retail_order_vendor: {
    total_tax: number;
    total_amount: number;
  }[];
}

interface Props {
  data: RetailOrderConfirmation;
}

const Orderfooter: React.FC<Props> = ({ data }) => {
  return (
    <tfoot>
      <tr>
        <th
          scope="row"
          colSpan={2}
          className="hidden pt-4 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
        >
          Tax
        </th>
        <th
          scope="row"
          className="pt-4 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
        >
          Tax
        </th>
        <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          <Price amount={data.total_tax.toFixed(2)} />
        </td>
      </tr>
      <tr>
        <th
          scope="row"
          colSpan={2}
          className="hidden pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
        >
          Subtotal
        </th>
        <th
          scope="row"
          className="pt-6 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
        >
          Subtotal
        </th>
        <td className="pt-6 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          <span>
            <Price amount={data.cart_data.subtotal} />
          </span>{" "}
          <span className="text-xs font-semibold max-w-fit">
            (Includes Tax)
          </span>
        </td>
      </tr>
      <tr>
        <th
          scope="row"
          colSpan={2}
          className="hidden pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
        >
          Delivery Fee
        </th>
        <th
          scope="row"
          className="pt-6 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
        >
          Delivery Fee
        </th>
        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          <Price amount={data.delivery_charge} />
        </td>
      </tr>
      {!!data.cart_data["discount"] ? (
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Discount
          </th>
          <th
            scope="row"
            className="pt-6 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
          >
            Discount
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            <span className="text-red-500">-</span>
            <Price amount={data.cart_data["discount"]} />
          </td>
        </tr>
      ) : null}
      {!!data.cart_data["coupon-discount"] ? (
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Coupon Discount
          </th>
          <th
            scope="row"
            className="pt-6 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
          >
            Coupon Discount
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            <span className="text-red-500">-</span>
            <Price amount={data.cart_data["coupon-discount"]} />
          </td>
        </tr>
      ) : null}
      {!!data.cart_data["loyalty-discount-amount"] ? (
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Loyalty Discount
          </th>
          <th
            scope="row"
            className="pt-6 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
          >
            Loyalty Discount
          </th>
          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            <span className="text-red-500">-</span>
            <Price amount={data.cart_data["loyalty-discount-amount"]} />
          </td>
        </tr>
      ) : null}
      {data.tip ? (
        <tr>
          <th
            scope="row"
            colSpan={2}
            className="hidden pt-4 pl-6 pr-3 text-sm font-bold text-right text-slate-500 sm:table-cell md:pl-0"
          >
            Tip
          </th>
          <th
            scope="row"
            className="pt-4 pl-4 pr-3 text-sm font-bold text-left text-slate-500 sm:hidden"
          >
            Tip
          </th>
          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
            <Price amount={data.tip} />
          </td>
        </tr>
      ) : null}
      <tr>
        <th
          scope="row"
          colSpan={2}
          className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
        >
          Total
        </th>
        <th
          scope="row"
          className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
        >
          Total
        </th>
        <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
          <Price amount={data.cart_data.total} />
        </td>
      </tr>
    </tfoot>
  );
};

export default Orderfooter;
