// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { buttonVariants } from "./ui/Button";

// const Hero = () => {
//   return (
//     <div className="bg-gray-900">
//       <div className="relative isolate overflow-hidden pt-14">
//         {/* <Image
//           src="https://cdn.discordapp.com/attachments/1143950670857257021/1158733659881349180/Delivery_Cover_3.png?ex=651dfb10&is=651ca990&hm=e74ebfd461ac0ffe0b12a59a15ddccfde45d7322a423689bcd5413b270ffd5dc&"
//           alt=""
//           className="absolute inset-0 -z-10 h-full w-full object-cover"
//           width={3125}
//           height={1406}
//         /> */}
//         {/* <div
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//           aria-hidden="true"
//         >
//           <div
//             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div> */}
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <form action="/search" className="max-w-2xl w-full px-4 mx-auto mb-4">
//             <div className="relative flex rounded-full px-10 bg-white overflow-hidden shadow text-slate-900">
//               <input
//                 type="text"
//                 name="serachRestaurant"
//                 className="flex-1 border-r h-12 px-2 outline-none"
//                 placeholder="Restaurant name or Food name"
//               />
//               <input
//                 type="text"
//                 placeholder="All Locations"
//                 className="flex-1 h-12 px-2"
//               />
//               <button type="submit">
//                 <svg
//                   className="text-brand h-5 w-5 absolute top-3.5 right-3 fill-current"
//                   xmlns="http://www.w3.org/2000/svg"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   version="1.1"
//                   x="0px"
//                   y="0px"
//                   viewBox="0 0 56.966 56.966"
//                   xmlSpace="preserve"
//                 >
//                   <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
//                 </svg>
//               </button>
//             </div>
//           </form>

//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
//               Chochow express to enrich your online business
//             </h1>
//             <p className="mt-6 text-lg leading-8 text-gray-300">
//               Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
//               lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
//               fugiat aliqua.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link
//                 href="/"
//                 className={cn(buttonVariants({ variant: "default" }))}
//               >
//                 Get started
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-sm font-semibold leading-6 text-white"
//               >
//                 Learn more <span aria-hidden="true">→</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* <div
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//           aria-hidden="true"
//         >
//           <div
//             className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//           />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Hero;

//------------------------------- prayush code -------------------------
// import { Button, buttonVariants } from "./ui/Button";
// import Carousel from "./Carousel";

// const Hero = () => {
//   return (
//     <main>
//       <div className="relative isolate overflow-hidden pt-8 flex items-center">
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32 px-4 sm:pl-7 pl-0">
//           <div className="text-center sm:text-left mb-6">
//             <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-6xl">
//               <span className="text-brand">Chochow Express</span> to enrich your
//               online <span className="text-brand">Business</span>
//             </h1>
//             <p className="mt-6 text-md sm:text-lg leading-8 text-gray-600">
//             ChowChow Express isn&apos;t just food delivery, it&apos;a movement supporting our Colorado community.
//             </p>
//           </div>
//           <form action="/search" className="max-w-2xl w-full mb-4">
//             <div className="relative flex bg-white rounded-lg border border-gray-400 overflow-hidden shadow text-slate-900 items-center">
//               <input
//                 type="text"
//                 placeholder="Enter your Delivery Entry"
//                 className="flex-1 h-12 px-2 border"
//               />
//               <Button className="mr-1">Get Started</Button>
//             </div>
//           </form>
//           <p className="text-gray-600">Popular Dishes</p>
//         </div>
//         <Carousel />
//       </div>
//     </main>
//   );
// };

// export default Hero;

import Carousel from "./Carousel";
import PlaceComponent from "./PlaceSearchMarketPlace";

const apiImage = [
  {
    image:
      "https://images.unsplash.com/photo-1554980291-c3e7cea75872?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2h8ZW58MHx8MHx8fDA%3D",
    offer: "10%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554980291-c3e7cea75872?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2h8ZW58MHx8MHx8fDA%3D",
    offer: "30%",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661677253638-ed2538328c63?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291cyUyMHZpZGV8ZW58MHx8MHx8fDA%3D",
    offer: "50%",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661677253638-ed2538328c63?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291cyUyMHZpZGV8ZW58MHx8MHx8fDA%3D",
    offer: "20%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554980291-c3e7cea75872?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2h8ZW58MHx8MHx8fDA%3D",
    offer: "40%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611315764615-3e788573f31e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMHRhYmxlfGVufDB8fDB8fHww",
    offer: "35%",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661677253638-ed2538328c63?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291cyUyMHZpZGV8ZW58MHx8MHx8fDA%3D",
    offer: "15%",
  },
];
const Hero = () => {
  return (
    <main>
      <div className="relative mx-auto max-w-[1440px] isolate overflow-hidden flex items-center">
        <div className="mx-auto max-w-2xl py-10 px-4 sm:pl-7 pl-0">
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-6xl">
              <span className="text-brand">Majjakodeals</span> Enrich your
              online <span className="text-brand">Presence.</span>
            </h1>
            <p className="mt-6 text-md sm:text-lg leading-8 text-gray-600">
              Majjakodeals isn&apos;t just food delivery, it&apos;a movement
              supporting our Colorado community.
            </p>
          </div>
          <PlaceComponent />
        </div>
        <Carousel carouselarray={apiImage} />
      </div>
    </main>
  );
};

export default Hero;
