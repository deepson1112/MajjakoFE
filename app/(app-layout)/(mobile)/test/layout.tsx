// "use client";
// import React, { useRef } from "react";
// import { TransitionRouter } from "next-transition-router";
// import { animate } from "framer-motion";

// const layout = ({ children }: { children: React.ReactNode }) => {
//   const wrapperRef = useRef<HTMLDivElement>(null!);
//   return (
//     <TransitionRouter
//       auto
//       leave={(next) => {
//         animate(
//           wrapperRef.current,
//           { opacity: [1, 0] },
//           { duration: 1, onComplete: next }
//         );
//       }}
//       enter={(next) => {
//         animate(
//           wrapperRef.current,
//           { opacity: [0, 1] },
//           { duration: 1, onComplete: next }
//         );
//       }}
//     >
//       <div ref={wrapperRef}>{children}</div>
//     </TransitionRouter>
//   );
// };

// export default layout;
import React from "react";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { q: string };
}) => {
  console.log("Params", params);
  return <div>{children}</div>;
};

export default layout;
