import { Button } from "@/components/ui/Button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Product } from "@/lib/validators/fooditems";
import { Minus, Plus } from "lucide-react";
import React, { Fragment } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

interface ProductSpecificationProps {
  form: UseFormReturn<Product>;
}

const ProductSpecification = ({ form }: ProductSpecificationProps) => {
  const { control } = form;

  console.log(form.watch("specifications"));

  const {
    fields: specifications,
    append: appendSpecifications,
    remove: removeSpecifications,
  } = useFieldArray({
    name: "specifications",
    control,
    keyName: "specificationKey",
  });
  return (
    <div className="p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Specification Name
            </th>
            <th scope="col" className="px-6 py-3">
              Specification Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-green-400 w-full">
          {specifications.map((specification, specificationIndex) => (
            <tr
              className="bg-white border-b"
              key={`product-specification-${specificationIndex}`}
            >
              <Fragment>
                <td className="px-6 py-4">
                  <FormField
                    control={form.control}
                    name={`specifications.${specificationIndex}.field`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Specification" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>

                <td className="px-6 py-4 ">
                  <FormField
                    control={form.control}
                    name={`specifications.${specificationIndex}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>

                <td className="px-6 py-4 ">
                  {specificationIndex === 0 ? null : (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() => {
                        removeSpecifications(specificationIndex);
                      }}
                    >
                      <Minus className="w-3 h-4" />
                    </Button>
                  )}
                </td>
              </Fragment>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button
          type="button"
          variant={"subtle"}
          className="w-fit ml-auto my-2"
          onClick={() => appendSpecifications({ field: "", value: "" })}
        >
          <Plus className="h-2 w-2 mr-2" /> Add New
        </Button>
      </div>
    </div>
  );
};

export default ProductSpecification;
