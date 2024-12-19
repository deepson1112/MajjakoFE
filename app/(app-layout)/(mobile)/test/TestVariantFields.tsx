// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/Select";
// import React, { Dispatch, SetStateAction, useState } from "react";
// import {
//   ProductVariation,
//   ProductVariation2,
// } from "@/lib/validators/fooditems";
// import { ProductVariationType } from "./TestInput";
// import TestVariationType from "../account/(vendor-layout)/menu-builder/food-menus/customization/TestVariationType";
// import { Button } from "@/components/ui/Button";

// interface VariantFieldsProps {
//   customForm: ProductVariation2;
//   index: number;
//   retailVariationTypes: ProductVariationType[];
//   setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
// }
// const TestVariantFields = ({
//   index,
//   retailVariationTypes,
//   customForm,
//   setCustomForm,
// }: VariantFieldsProps) => {
//   const [isImageAllowed, setIsImageAllowed] = useState(false);

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <div className="w-full">
//         <Select
//           onValueChange={(value) => {
//             const [id, name] = value.split("-");

//             setCustomForm((prev) =>
//               prev.map((item, i) =>
//                 i === index
//                   ? {
//                       collections: [
//                         {
//                           id: "",
//                           name: "",
//                           price: "",
//                           sku: "",
//                           stock_quantity: 0,
//                           variations_image: [""],
//                         },
//                       ],
//                       id,
//                       name,
//                     }
//                   : item
//               )
//             );
//           }}
//           value={
//             `${customForm[index].id}-${customForm[index].name}` || undefined
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select a Variation Type" />
//           </SelectTrigger>

//           <SelectContent>
//             {retailVariationTypes.map((type) => (
//               <SelectItem value={`${type.id}-${type.name}`} key={type.name}>
//                 {type.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {customForm[index].name === "Color" ? (
//         <Checkbox
//           value={isImageAllowed}
//           setValue={setIsImageAllowed}
//           setCustomForm={setCustomForm}
//           name="image"
//           index={index}
//         >
//           Add image
//         </Checkbox>
//       ) : null}

//       {!!customForm[index].id && !!customForm[index].collections.length ? (
//         <div className="flex flex-col gap-3">
//           <div className="flex flex-col gap-1 items-start">
//             {customForm[index].collections.map(
//               (collection, collectionIndex) => (
//                 <TestVariationType
//                   collectionIndex={collectionIndex}
//                   index={index}
//                   customForm={customForm}
//                   setCustomForm={setCustomForm}
//                   retailVariationTypes={retailVariationTypes}
//                   value={Number(customForm[index].id)}
//                   key={customForm[index].id}
//                   isImageAllowed={isImageAllowed}
//                 />
//               )
//             )}
//           </div>
//           <Button
//             variant={"outline"}
//             onClick={() =>
//               setCustomForm((prev) =>
//                 prev.map((item, indx) =>
//                   indx === index
//                     ? {
//                         id: item.id,
//                         name: item.name,
//                         collections: [
//                           ...item.collections,
//                           {
//                             id: "",
//                             name: "",
//                             price: "",
//                             sku: "",
//                             stock_quantity: 0,
//                             variations_image: [""],
//                           },
//                         ],
//                       }
//                     : item
//                 )
//               )
//             }
//           >
//             Add New
//           </Button>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default TestVariantFields;

// interface CheckboxProps {
//   value: boolean;
//   setValue: Dispatch<SetStateAction<boolean>>;
//   children: React.ReactNode;
//   name: string;
//   setCustomForm: Dispatch<SetStateAction<ProductVariation2>>;
//   index: number;
// }

// const Checkbox = ({
//   children,
//   setValue,
//   value,
//   name,
//   index,
//   setCustomForm,
// }: CheckboxProps) => {
//   return (
//     <label className="checkbox">
//       <input
//         type="checkbox"
//         className="mr-2"
//         name={name}
//         checked={value}
//         onChange={() => {
//           // setCustomForm((prev) =>
//           //   prev[index].collections[0].variations_image.push("s")
//           // );
//           setValue(!value);
//         }}
//       />
//       {children}
//     </label>
//   );
// };
