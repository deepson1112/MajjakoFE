// "use client";
// import CartCounterAndButtons from "@/components/CartCounterAndButtons";
// import { Button } from "@/components/ui/Button";
// import { ChevronRight, Minus, Plus } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useRef } from "react";

// interface Props {
//   params: {
//     restaurant_id: string;
//   };
// }

// const FoodCategoriesListArr = [
//   {
//     categoryTitle: "Featured Items",
//     foodItems: [
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//     ],
//   },
//   {
//     categoryTitle: "Most Popular",
//     foodItems: [
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//     ],
//   },
//   {
//     categoryTitle: "Combo Meals",
//     foodItems: [
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//       {
//         foodTitle: "Curry Paneer",
//         price: "12",
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
//       },
//     ],
//   },
// ];

// const page = ({ params }: Props) => {
//   const { restaurant_id } = params;

//   const ref = useRef<HTMLDivElement[]>([]);
//   const handleScrollIntoView = () => {
//     if (ref.current) {
//       ref.current[1].scrollIntoView({
//         behavior: "smooth",
//         // top: 50,
//       });
//     }
//   };

//   const handleClick = () => {
//     console.log(ref);
//   };

//   return (
//     <div className="flex mt-8 relative">
//       <section className="max-w-xs w-full max-h-screen hidden md:block sticky top-6 left-0">
//         <ul className="flex flex-col space-y-5 font-semibold">
//           <li onClick={handleScrollIntoView}>Featured Items</li>
//           <li>Most Popular</li>
//           <li>Combo Meals</li>
//           <li>Fries</li>
//           <li>Shareables</li>
//           <li>Happy Meals</li>
//           <li>McCafe Coffees</li>
//           <li>Condiments</li>
//           <li>Sides & More</li>
//           <li>Sweets & Treats</li>
//           <li>Bevarage</li>
//         </ul>
//       </section>

//       <section className="w-full">
//         {FoodCategoriesListArr.map((food) => (
//           <div
//             className="mb-10"
//             ref={(el: HTMLDivElement) => ref?.current.push(el)}
//           >
//             <div className="flex items-center justify-between">
//               <h3 className="font-bold text-xl mb-6">{food.categoryTitle}</h3>
//               <Button variant={"ghost"}>
//                 See All <ChevronRight />{" "}
//               </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {food.foodItems.map((data, index) => (
//                 <div
//                   // ref={ref}
//                   className="cursor-pointer hover:shadow-md group w-full h-36 rounded-lg flex justify-between border"
//                 >
//                   <div className="p-4">
//                     <h3 className="font-semibold">Curry Paneer</h3>
//                     <p className="line-clamp-2">
//                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                       Harum saepe quibusdam eaque recusandae blanditiis cumque!
//                       Corporis a beatae rerum aspernatur. Lorem ipsum dolor sit
//                       amet consectetur adipisicing elit. Quis dolorem minima
//                       quae corporis velit architecto minus soluta nemo nisi
//                       doloribus.
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h6>$12</h6>
//                       </div>
//                     </div>
//                   </div>
//                   <Link href={"#"} className="relative">
//                     <Image
//                       height={1000}
//                       width={1000}
//                       alt="Food-image"
//                       src={
//                         "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
//                       }
//                       className="object-center object-cover rounded-r-sm min-w-42 h-full"
//                     />
//                     {/* <Button
//                       variant={"subtle"}
//                       className="rounded-full absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 font-semibold shadow"
//                     >
//                       View Details
//                     </Button> */}

//                     <CartCounterAndButtons />
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default page;
