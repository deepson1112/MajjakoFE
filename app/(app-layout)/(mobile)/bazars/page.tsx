// "use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const bazarList = [
  {
    name: "Electornic & Gadets",
    description: "Find all the electorinc items",
    img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
  },
  {
    name: "Food Items",
    description: "Find all the Food Items",
    img: "https://images.unsplash.com/photo-1547558840-8ad6c8e662a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGl0ZW1zfGVufDB8fDB8fHww",
  },
  {
    name: "Beverages",
    description: "Find all the Beverage",
    img: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Clothings",
    description: "Find all the clothings",
    img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bakery",
    description: "Find all the bakery items",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const BazarPage = () => {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bazarList.map((list, index) => (
          <Link
            key={index}
            href={"/"}
            className="group w-full relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40"
          >
            <img
              src={list.img}
              alt="im"
              className="group-hover:scale-105 transition-all duration-300 absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="group-hover:via-gray-900/60 absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
              {list.name}
            </h3>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              {list.description}
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default BazarPage;
