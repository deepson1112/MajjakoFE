// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import { colorCodes } from "@/lib/Constants";

// interface CategoryProps {
//   image: string;
//   name: string;
//   index: number;
// }

// function FavouriteCusineCard({ image, name, index }: CategoryProps) {
//   return (
//     <Link
//       href=""
//       className="w-16 h-36 md:w-24 md:h-36 shrink-0 rounded-lg flex flex-col justify-between text-center items-center"
//     >
//       <div
//         style={{ backgroundColor: `${colorCodes[index % 10]}` }}
//         className={`flex justify-items-center h-24 w-[85px] p-4 rounded-lg`}
//       >
//         <Image
//           src={image}
//           alt={name}
//           height={800}
//           width={800}
//           className="w-16 h-16 bg-center"
//         ></Image>
//       </div>
//       <h2 className=" font-bold p-2 text-xs truncate w-14">{name}</h2>
//     </Link>
//   );
// }

// export default FavouriteCusineCard;
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { colorCodes } from "@/lib/Constants";

interface CategoryProps {
  image: string;
  name: string;
  index: number;
}

function FavouriteCusineCard({ image, name, index }: CategoryProps) {
  return (
    <Link
      href=""
      className="rounded-lg flex flex-col justify-between text-center items-center"
    >
      <div
        style={{ backgroundColor: `${colorCodes[index % 10]}` }}
        className={`flex justify-items-center p-4 rounded-lg`}
      >
        <Image
          src={image}
          alt={name}
          height={800}
          width={800}
          className="w-16 h-16 bg-center"
        ></Image>
      </div>
      <h2 className=" font-bold p-2 text-xs truncate w-14">{name}</h2>
    </Link>
  );
}

export default FavouriteCusineCard;
