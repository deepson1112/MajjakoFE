// "use client";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Plus } from "lucide-react";
// import React, { Dispatch, SetStateAction, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/Dialog";
// import { Button } from "../../../components/ui/Button";
// import { useMutation, useQuery } from "react-query";
// import { api } from "@/lib/fetcher";
// import {
//   CartCounterAndButtonsProps,
//   userCart,
//   userCart as userCartType,
// } from "@/types";
// import CustomizeCartItems from "../../../components/cart/CustomizeCartItems";
// import CartCounterAndButtonsAddCart from "../../../components/cart/CartcounterAndButtonsAddCart";
// import { Skeleton } from "@/components/ui/Skeleton";

// const CartAddonsSchema = z.object({
//   quantity: z.number(),
//   customization: z.number(),
// });

// const FormSchema = z.object({
//   receiver_name: z.string().optional(),
//   special_request: z.string().optional(),
//   cart_addons: z.array(CartAddonsSchema).optional(),
// });

// export type formSchemaType = z.infer<typeof FormSchema>;

// const CartListCounterAndButtons = ({
//   foodTitle,
//   fooditem,
//   openGlobal,
//   setOpenGlobal,
//   variant,
// }: {
//   addons?: CartCounterAndButtonsProps[];
//   foodTitle: string;
//   fooditem: number;
//   openGlobal: boolean;
//   setOpenGlobal: Dispatch<SetStateAction<boolean>>;
//   variant?: boolean;
// }) => {
//   const [addons, setAddons] = useState([]);

//   const { data: foodCartItems, isLoading: foodCartItemsLoader } = useQuery<
//     userCartType[]
//   >({
//     queryFn: async () => {
//       const response = await api()
//         .get(`/marketplace/cart/?fooditem=${fooditem}`)
//         .json<userCartType[]>();

//       return response;
//     },

//     queryKey: [`food-cart-items-${fooditem}`],
//     retry: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     onSuccess: () => {},
//   });

//   const { data: foodLists, isLoading: foodListsLoader } = useQuery<
//     userCartType[]
//   >({
//     queryFn: async () => {
//       const response = await api().get(`/menu/food/`).json();
//       return response as userCartType[];
//     },
//     queryKey: [`food-list`],
//     onSuccess: (data) => {
//       const foodItemAddons = data.find((currentFoodItem) => {
//         return currentFoodItem.id === fooditem;
//       });
//       // @ts-ignore
//       setAddons(foodItemAddons.food_addons);
//     },
//   });

//   const { mutate: handleUpdateCartQuantity, isLoading } = useMutation({
//     mutationFn: async ({
//       payload,
//       id,
//     }: {
//       id: number;
//       payload: { quantity: number };
//     }) => {
//       const response = await api()
//         .patch(payload, `/marketplace/update-cart-quantity/${id}/`)
//         .json();
//       return response;
//     },
//   });

//   return (
//     <>
//       <Dialog open={openGlobal} onOpenChange={setOpenGlobal}>
//         <DialogTrigger asChild>
//           {variant ? (
//             <button
//               className="h-6 w-6 flex items-center justify-center bg-brand transition hover:bg-brand_hover hover:text-white rounded-full"
//               // onClick={() => handleQuantityChange(quantity + 1)}
//             >
//               <Plus className="text-white" />
//             </button>
//           ) : (
//             <button className="bg-gray-900 rounded-full">
//               <Plus width={24} height={24} />
//             </button>
//           )}
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader>
//             <DialogTitle>Addons/Modifier</DialogTitle>
//             <DialogDescription>{foodTitle}</DialogDescription>
//           </DialogHeader>
//           <section className="space-y-3">
//             {/* @ts-ignore */}
//             {!!foodCartItems &&
//               foodCartItems.map(
//                 (cartItem) =>
//                   !!cartItem.cart_addons &&
//                   !!cartItem.cart_addons.length && (
//                     <CustomizeCartItems
//                       cartItem={cartItem}
//                       foodItem={fooditem}
//                       key={cartItem.id}
//                       handleUpdateCartQuantity={handleUpdateCartQuantity}
//                     />
//                   )
//               )}
//             <div className="flex items-center space-x-3">
//               {foodListsLoader ? (
//                 <Skeleton className="h-10 w-full" />
//               ) : (
//                 <CartCounterAndButtonsAddCart
//                   addons={addons}
//                   foodTitle={foodTitle}
//                   fooditem={fooditem}
//                   variant={false}
//                   setOpenGlobal={setOpenGlobal}
//                 />
//               )}

//               <Button
//                 variant={"outline"}
//                 className="flex-1"
//                 onClick={() => {
//                   console.log("This is it");
//                   setOpenGlobal(false);
//                 }}
//               >
//                 Done
//               </Button>
//             </div>
//           </section>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default CartListCounterAndButtons;
