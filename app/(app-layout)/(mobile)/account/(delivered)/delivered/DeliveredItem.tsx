// import Link from "next/link";

// import Image from "next/image";
// import { Order } from "./[id]/RefundableItem";

// const DeliveredItem = ({
//   order_id,
//   order_number,
//   ordered_products,
//   id,
// }: Order) => {
//   return (
//     <li
//       key={`delivered-items-${order_id}`}
//       className="border border-dotted rounded-lg space-y-3 shadow"
//     >
//       <div className="p-6">
//         <p className="text-gray-600">
//           <span className="font-semibold text-gray-80000">Order id:</span>{" "}
//           {order_number}
//         </p>
//         <span className="text-xs font-semibold text-gray-500">
//           Number of ordered items: {ordered_products.length}
//         </span>
//         <div className="flex gap-3 mt-2">
//           {ordered_products.map((product) => (
//             <div key={`delivered-item-${product.id}`} className="flex flex-row">
//               {product.retail_product_variation_details.variations_image.map(
//                 (image, index) => (
//                   <div key={`product-delivered-${index}`}>
//                     <Image
//                       src={image.default_image || image.image}
//                       alt={`product-image-${index}`}
//                       height={1000}
//                       width={1000}
//                       className="aspect-square w-44 rounded-lg object-cover object-center"
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="w-full border-t p-4 flex justify-end">
//         <div className="space-x-3">
//           <Link
//             href={`delivered/${order_number}`}
//             className="border border-red-500 py-1 px-4 rounded-full font-semibold text-red-500 hover:bg-red-500 hover:text-white"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default DeliveredItem;
