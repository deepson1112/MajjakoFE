import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { taxCalculator } from "@/lib/utils";
import { Product } from "@/lib/validators/fooditems";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductDetailsProps {
  form: UseFormReturn<Product>;
}

const ProductDetails = ({ form }: ProductDetailsProps) => {
  const product_variations = form.watch("products_variations");
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Variations
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              SKU
            </th>
            <th scope="col" className="px-6 py-3">
              Stock Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Tax (13%)
            </th>
            <th scope="col" className="px-6 py-3">
              excluding tax
            </th>
          </tr>
        </thead>
        <tbody>
          {!!product_variations?.length &&
            product_variations.map((items, index) => (
              <tr
                className="bg-white border-b"
                key={`current-variation-table-row${index}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {/* {Object.entries(item).map(([key, value]) =>
                key.endsWith("Name") ? `${value}  ` : null
              )} */}
                  {items.variation.join("-")}
                </th>
                <td className="px-6 py-4">
                  {/* <Input
                type="text"
                value={item.price}
                placeholder="Price"
                onChange={(value) =>
                  setCurrentVariations((prev) =>
                    prev.map((items, index) =>
                      index === currentRowIndex
                        ? { ...items, price: value.target.value }
                        : items
                    )
                  )
                }
              /> */}
                  <FormField
                    control={form.control}
                    name={`products_variations.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-6 py-4">
                  <FormField
                    control={form.control}
                    name={`products_variations.${index}.sku`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" placeholder="sku" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-6 py-4">
                  <FormField
                    control={form.control}
                    name={`products_variations.${index}.stock_quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="stock quantity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <td className="px-6 py-4">
                  {taxCalculator(items.price, 13)[1]}
                </td>
                <td className="px-6 py-4">
                  {taxCalculator(items.price, 13)[0]}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
