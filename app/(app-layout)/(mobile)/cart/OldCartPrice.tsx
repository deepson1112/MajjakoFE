// import React from "react";

// interface CartPriceProps {
//   addonsPrice: number;
//   discount?: number;
// }

// const CartPrice = ({ addonsPrice, discount }: CartPriceProps) => {
//   console.log("This si addons price and discunt", addonsPrice, discount);
//   if (discount) {
//     const discountAmount = (discount * addonsPrice) / 100;
//     const discountedAmount = addonsPrice - discountAmount;

//     return (
//       <p
//         className="shrink-0 w-20 text
//       -sm text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
//       >
//         <span className="font-semibold">${discountedAmount}</span>{" "}
//         <span className="line-through text-gray-400 text-sm">
//           ${addonsPrice}
//         </span>
//       </p>
//     );
//   }
//   return (
//     <p
//       className="shrink-0 w-20 text
//     -sm font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
//     >
//       ${addonsPrice}
//     </p>
//   );
// };

// export default CartPrice;
