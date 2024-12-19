// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const stats = [
//   { label: "Transactions every 24 hours", value: "44 million" },
//   { label: "Assets under holding", value: "$119 trillion" },
//   { label: "New users annually", value: "46,000" },
// ];
// const values = [
//   {
//     name: "Community Support",
//     description:
//       "Our top priority is supporting the Colorado community. We believe in the power of local businesses to enrich our neighborhoods and foster a sense of togetherness. Every order placed through our platform helps fund local schools, non-profit organizations, and community-driven programs. By choosing ChowChow Express, you're not just getting a meal; you're contributing to the betterment of our community.",
//   },
//   {
//     name: "Fairness and Transparency",
//     description:
//       "We stand against the exploitative practices of high commission fees and unfair wage distribution. At ChowChow Express, we ensure 100% of delivery fees and tips go directly to our drivers. We maintain transparent and fair fee structures for our partner restaurants, ensuring they can thrive without the burden of excessive costs. Our commitment to fairness means that everyone in the delivery chain, from the restaurant to the driver, benefits equitably.",
//   },
//   {
//     name: "Empowerment of Local Businesses",
//     description:
//       "Our mission is to empower local businesses by providing them with a cost-effective, locally-oriented technology platform. We enable restaurants and suppliers to operate independently while still accessing a premium delivery service. By fostering a cooperative approach, we help local businesses flourish and create a vibrant, sustainable local economy. ChowChow Express is dedicated to nurturing local entrepreneurship and providing a solid foundation for businesses to succeed.",
//   },
//   {
//     name: "Sustainability and Growth",
//     description:
//       "We believe in creating a sustainable future for our community. By supporting local businesses, we reduce the environmental impact associated with long-distance delivery services. Our commitment to sustainability extends to our business practices, where we prioritize eco-friendly options and encourage our partners to do the same. Through our collective efforts, we aim to build a robust, self-sustaining local ecosystem that promotes long-term growth and prosperity.      ",
//   },
//   {
//     name: "Ethical Business Practices",
//     description:
//       "ChowChow Express is built on a foundation of ethical business practices. We uphold the highest standards of integrity in all our operations, ensuring that our actions align with our values. We reject any form of exploitation and strive to create a fair and respectful environment for all our stakeholders. By championing ethical practices, we aim to set a positive example in the industry and inspire others to follow suit.",
//   },
//   {
//     name: "Innovation and Excellence",
//     description:
//       "Our vision is to revolutionize the hospitality industry through innovation and excellence. We continuously seek out new ways to enhance our platform and improve the user experience. By integrating advanced technology with a local focus, we provide our partners with cutting-edge tools to streamline their operations. Our dedication to excellence ensures that ChowChow Express remains a trusted, reliable choice for local businesses and customers alike.",
//   },
// ];

// export default function AboutPage() {
//   return (
//     <div className="bg-white">
//       <main className="isolate">
//         {/* Hero section */}
//         <div className="relative isolate my-[-100px] -z-10">
//           <div className="overflow-hidden">
//             <div className="mx-auto max-w-7xl px-6 pb-32 lg:px-8 ">
//               <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
//                 <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
//                   <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//                     {/* We’re changing the way people Order Food Online. */}
//                     Eat Local, Love Local, Be Local !
//                   </h1>
//                   <p className="relative mt-6 text-lg text-justify leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
//                     <Link className="text-brand px-2 font-semibold" href={"/"}>
//                       ChowChow Express
//                     </Link>
//                     isn&apos;t just about food delivery; it&apos;s a movement
//                     dedicated to supporting our Colorado community. Whether
//                     it&apos;s business lunches, team gatherings, or special
//                     events, we specialize in fulfilling large orders while
//                     offering lower fees to local restaurants. When you order
//                     from us, our drivers receive
//                     <span className="text-slate-700 font-bold px-2">
//                       100%
//                     </span>
//                     of fees and tips, ensuring direct community support. Every
//                     order you make fuels our mission to uplift our neighbors,
//                     friends, and our beloved community. We&apos;re committed to
//                     supporting local schools, non-profit organizations, and
//                     community-driven programs. Join us in transforming our
//                     community, one meal at a time.
//                   </p>
//                 </div>
//                 <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
//                   <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
//                     <div className="relative">
//                       <Image
//                         height={1000}
//                         width={1000}
//                         src="https://plus.unsplash.com/premium_photo-1669150852127-2435412047f2?q=80&w=2017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                   <div className="w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
//                     <div className="relative">
//                       <Image
//                         height={1000}
//                         width={1000}
//                         src="https://images.unsplash.com/photo-1619161208416-b7d5f04c5b99?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                     <div className="relative">
//                       <Image
//                         height={1000}
//                         width={1000}
//                         src="https://images.unsplash.com/photo-1605461682195-9fd4d079a41d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                   <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
//                     <div className="relative">
//                       <Image
//                         height={1000}
//                         width={1000}
//                         src="https://images.unsplash.com/photo-1657196118354-f25f29fe636d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                     <div className="relative">
//                       <Image
//                         height={1000}
//                         width={1000}
//                         src="https://images.unsplash.com/photo-1577110632782-397c0dea76b4?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content section */}
//         <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
//           <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
//             <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
//               <div className="lg:flex lg:flex-auto lg:justify-center">
//                 <Image
//                   height={1000}
//                   width={1000}
//                   src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt=""
//                   className="rounded-xl object-cover max-w-sm"
//                 />
//               </div>
//               <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
//                 <h2 className="text-3xl my-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
//                   Our Vission
//                 </h2>
//                 <p className="text-base max-w-xl text-justify leading-8 text-gray-700">
//                   Our vision is to revolutionize the hospitality industry by
//                   providing a cost-effective, locally oriented-technology
//                   platform.
//                 </p>
//                 <div className="mt-2 max-w-xl text-justify text-base leading-7 text-gray-700">
//                   <p>
//                     We aim to empower local businesses by offering a premium,
//                     locally-grown delivery platform, enabling them to thrive
//                     independently while directly supporting their clients. Our
//                     cooperative approach fosters community growth and sustains
//                     local delivery companies, creating a dynamic ecosystem that
//                     champions local entrepreneurship.
//                   </p>
//                   <p className="mt-2 text-justify">
//                     <Link className="text-brand px-2 font-semibold" href={"/"}>
//                       ChowChow Express
//                     </Link>
//                     is more than just a delivery platform; it&apos;s a
//                     grassroots movement dedicated to supporting local
//                     businesses. We believe in transferring 100% of delivery fees
//                     and tips directly to our local delivery partners. Moreover,
//                     we strive to keep costs minimal for our partner restaurants
//                     and suppliers, ensuring they receive maximum benefit.
//                     Operated and owned by members of our local community,
//                     <Link className="text-brand px-2 font-semibold" href={"/"}>
//                       ChowChow Express
//                     </Link>
//                     stands out as a preferred choice recommended by local
//                     restaurants, food vendors, and suppliers.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* responsibility section */}
//         <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:mt-12">
//           <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
//             <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
//               <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
//                 <div className="mt-4 max-w-xl text-base leading-7 text-gray-700">
//                   <h2 className="text-3xl my-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
//                     Corporate Responsibility
//                   </h2>
//                   <p className="text-justify">
//                     We staunchly oppose the unjust practice of imposing
//                     exorbitant fees on restaurants—charging between 30-35% or
//                     more than 15% and withholding half of driver&apos;s
//                     commission and delivery fees. At
//                     <Link className="text-brand px-2 font-semibold" href={"/"}>
//                       ChowChow Express
//                     </Link>
//                     , we firmly believe this behavior is akin to extortion. Our
//                     unwavering commitment to fairness drives us. Our platform
//                     empowers local businesses, cultivating enduring alliances
//                     between restaurants and their preferred delivery partners.
//                     Upholding stringent ethical standards, we champion the
//                     growth of vibrant local enterprises and foster respectful
//                     community partnerships. Join us in making a real impact on
//                     our community – where every delivery contributes to the
//                     growth and sustainability of local businesses.
//                     <span className="text-slate-700 font-bold">
//                       Eat local, Love Local, Be Local!
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="lg:flex lg:flex-auto lg:justify-center">
//                 <Image
//                   height={1000}
//                   width={1000}
//                   src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt=""
//                   className="rounded-xl object-cover max-w-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Image section */}
//         <div className="mt-24 sm:mt-28 xl:mx-auto xl:max-w-7xl xl:px-8">
//           <Image
//             height={1000}
//             width={1000}
//             src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt=""
//             className="aspect-[5/2] w-full object-cover bg-top xl:rounded-3xl"
//           />
//         </div>

//         {/* Values section */}
//         <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-28 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:mx-0">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Our values
//             </h2>
//           </div>
//           <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {values.map((value) => (
//               <div key={value.name}>
//                 <dt className="font-semibold text-gray-900">{value.name}</dt>
//                 <dd className="mt-1 text-justify text-gray-600">
//                   {value.description}
//                 </dd>
//               </div>
//             ))}
//           </dl>
//         </div>

//         {/* Trusted By Design */}
//         <div className="relative isolate -z-10 mt-12 sm:mt-16">
//           <h2 className="text-center text-2xl font-bold leading-8 text-gray-900">
//             Trusted by
//           </h2>
//           <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
//             <div className="flex items-center rounded-xl hover:shadow-xl justify-center col-span-1 md:col-span-2 lg:col-span-1">
//               <Image
//                 className="h-24 w-24 mt-2"
//                 src="/partners/gaia-logo.webp"
//                 alt="Gaia Masala & Burgers"
//                 width={158}
//                 height={48}
//               />
//             </div>

//             <div className="flex items-center rounded-xl hover:shadow-xl justify-center col-span-1 md:col-span-2 lg:col-span-1">
//               <Image
//                 className="h-32 mt-2"
//                 src="/partners/total.png"
//                 alt="Total vegan"
//                 width={158}
//                 height={48}
//               />
//             </div>

//             <div className="flex items-center rounded-xl hover:shadow-xl justify-center col-span-1 md:col-span-2 lg:col-span-1">
//               <Image
//                 className="h-32 mt-2"
//                 src="/partners/highland.png"
//                 alt="Serene India Cuisine"
//                 width={158}
//                 height={48}
//               />
//             </div>

//             <div className="flex items-center rounded-xl hover:shadow-xl justify-center col-span-1 md:col-span-3 lg:col-span-1">
//               <Image
//                 className="h-32 mt-2"
//                 src="/partners/haveli.png"
//                 alt="Haldi Haveli"
//                 width={158}
//                 height={48}
//               />
//             </div>

//             <div className="flex items-center rounded-xl hover:shadow-xl justify-center col-span-2 md:col-span-3 lg:col-span-1">
//               <Image
//                 className="h-32 mt-2"
//                 src="/partners/grande.png"
//                 alt="Rio Grande"
//                 width={158}
//                 height={48}
//               />
//             </div>
//           </div>
//         </div>
//         {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
//             <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
//               Trusted by
//             </h2>
//             <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
//               <Image
//                 className="col-span-2 h-24 w-36 col-start-2 max-h-32 object-contain lg:col-span-1"
//                 src="/partners/gaia-logo.webp"
//                 alt="Gaia Masala and Burgers"
//                 width={158}
//                 height={48}
//               />
//               <Image
//                 className="col-span-2 h-24 w-36 col-start-2 max-h-32 object-contain lg:col-span-1"
//                 src="/partners/highland.png"
//                 alt="Serene India Cuisine"
//                 width={158}
//                 height={48}
//               />
//               <Image
//                 className="col-span-2h-24 w-36 col-start-2 max-h-32 object-contain lg:col-span-1"
//                 src="/partners/haveli.png"
//                 alt="Haldi Haveli"
//                 width={158}
//                 height={48}
//               />
//               <Image
//                 className="col-span-2 h-24 w-36 col-start-2 max-h-32 object-contain sm:col-start-2 lg:col-span-1"
//                 src="/partners/total.png"
//                 alt="Total Vegan"
//                 width={158}
//                 height={48}
//               />
//               <Image
//                 className="col-span-2 h-24 w-36 col-start-2 max-h-32 object-contain sm:col-start-auto lg:col-span-1"
//                 src="/partners/grande.png"
//                 alt="Rio Grande"
//                 width={1000}
//                 height={1000}
//               />
//             </div>
//           </div>
//         </div>*/}
//       </main>
//     </div>
//   );
// }
import Image from "next/image";
import React from "react";
import { AnimatedListContainer } from "./animatedlistContainer";
import Link from "next/link";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className=" fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff6_100%)]"></div>
        <section className="w-full py-6 md:py-12">
          <div className="px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="hidden lg:block mx-auto min-h-[350px] max-h-[350px] aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <div className="grid grid-cols-6 col-span-2 gap-2">
                  <div className=" overflow-hidden rounded-xl col-span-3 max-h-[10rem]">
                    <Image
                      className="h-full w-full object-cover "
                      height={500}
                      width={500}
                      src="https://plus.unsplash.com/premium_photo-1669150852127-2435412047f2?q=80&w=2017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div className=" overflow-hidden rounded-xl col-span-3 max-h-[10rem]">
                    <Image
                      className="h-full w-full object-cover  "
                      height={500}
                      width={500}
                      src="https://images.unsplash.com/photo-1619161208416-b7d5f04c5b99?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                    <Image
                      className="h-full w-full object-cover "
                      height={500}
                      width={500}
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt=""
                    />
                  </div>
                  <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                    <Image
                      className="h-full w-full object-cover "
                      height={500}
                      width={500}
                      src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                  </div>
                  <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                    <Image
                      className="h-full w-full object-cover "
                      height={500}
                      width={500}
                      src="https://images.unsplash.com/photo-1605461682195-9fd4d079a41d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className=" flex flex-row flex-wrap text-3xl w-full lg:max-w-[750px] break-words font-bold justify-center md:justify-start sm:text-4xl">
                  Eat
                  <strong>
                    <span className="text-brand px-2">Local!</span>
                  </strong>
                  Be
                  <strong>
                    <span className="text-brand px-2">Local!</span>
                  </strong>
                </div>
                <p className="w-full lg:max-w-[750px] text-slate-700 font-medium md:text-md/relaxed xl:text-md/relaxed text-justify">
                  Majjakodeals isn&apos;t just about food delivery it&apos;s a
                  movement dedicated to supporting our Colorado community.
                  Whether it&apos;s business lunches, team gatherings, or
                  special events, we specialize in fulfilling large orders while
                  offering lower fees to local restaurants. When you order from
                  us, our drivers receive100% of fees and tips, ensuring direct
                  community support. Every order you make fuels our mission to
                  uplift our neighbors, friends, and our beloved community.
                  We&apos;re committed to supporting local schools, non-profit
                  organizations, and community-driven programs. Join us in
                  transforming our community, one meal at a time.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="550"
                height="310"
                alt=""
                className="mx-auto min-h-[400px] max-h-[400px] aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
              />
              <div className="space-y-4">
                <div className=" flex flex-row flex-wrap text-3xl w-full lg:max-w-[750px] break-words font-bold justify-center md:justify-start sm:text-4xl">
                  Our
                  <strong>
                    <span className="text-brand px-2">Vission</span>
                  </strong>
                </div>
                <p className="w-full lg:max-w-[750px] text-slate-700 font-medium md:text-md/relaxed xl:text-md/relaxed text-justify">
                  We aim to empower local businesses by offering a premium,
                  locally-grown delivery platform, enabling them to thrive
                  independently while directly supporting their clients. Our
                  cooperative approach fosters community growth and sustains
                  local delivery companies, creating a dynamic ecosystem that
                  champions local entrepreneurship.
                  <Link className="text-brand pr-1 font-semibold" href={"/"}>
                    Majjakodeals
                  </Link>
                  is more than just a delivery platform; it&apos;s a grassroots
                  movement dedicated to supporting local businesses. We believe
                  in transferring 100% of delivery fees and tips directly to our
                  local delivery partners. Moreover, we strive to keep costs
                  minimal for our partner restaurants and suppliers, ensuring
                  they receive maximum benefit. Operated and owned by members of
                  our local community,
                  <Link className="text-brand pr-1 font-semibold" href={"/"}>
                    Majjakodeals
                  </Link>
                  stands out as a preferred choice recommended by local
                  restaurants, food vendors, and suppliers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <Image
                src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="550"
                height="310"
                alt=""
                className="hidden lg:block mx-auto min-h-[400px] max-h-[400px] aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="space-y-4">
                <div className=" flex flex-row flex-wrap text-3xl w-full lg:max-w-[750px] break-words font-bold justify-center md:justify-start sm:text-4xl">
                  Corporate
                  <strong>
                    <span className="text-brand px-2">Responsibility</span>
                  </strong>
                </div>
                <p className="w-full lg:max-w-[750px] text-slate-700 font-medium md:text-md/relaxed xl:text-md/relaxed text-justify">
                  We staunchly oppose the unjust practice of imposing exorbitant
                  fees on restaurants—charging between 30-35% or more than 15%
                  and withholding half of driver&apos;s commission and delivery
                  fees. At
                  <Link className="text-brand px-1 font-semibold" href={"/"}>
                    Majjakodeals
                  </Link>
                  , we firmly believe this behavior is akin to extortion. Our
                  unwavering commitment to fairness drives us. Our platform
                  empowers local businesses, cultivating enduring alliances
                  between restaurants and their preferred delivery partners.
                  Upholding stringent ethical standards, we champion the growth
                  of vibrant local enterprises and foster respectful community
                  partnerships. Join us in making a real impact on our community
                  – where every delivery contributes to the growth and
                  sustainability of local businesses.
                  <span className="text-slate-700 font-bold">
                    Eat local, Love Local, Be Local!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="px-4 md:px-6">
            <div className="mx-auto grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <AnimatedListContainer />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="550"
                height="310"
                alt="Customer Testimonials"
                className="mx-auto min-h-[400px] max-h-[400px] aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
