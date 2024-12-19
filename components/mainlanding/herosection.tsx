// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-[55vh] pt-28 md:pt-0 flex items-start md:items-center justify-center bg-[url('/Hero/Hero-section-img-2.jpg')] bg-center bg-cover">
//       <div className="absolute inset-0 bg-brand/30 z-0" />
//       {/* <div className="relative z-0 text-center text-white space-y-6 px-4 sm:px-6 md:px-10">
//         <h1 className="font-extrabold text-6xl">ChowChow Express</h1>
//         <p className="text-lg md:text-xl max-w-[800px]">
//           Experience the finest cuisine in a warm and inviting atmosphere.
//         </p>
//         <Link
//           href="#"
//           className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
//           prefetch={false}
//         >
//           View Menu
//         </Link>
//       </div> */}
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-8 mx-auto px-2.5 md:px-16">
      <div className="grid items-center gap-6 px-4 lg:grid-cols-2">
        <div>
          <p className="text-4xl text-zinc-700 font-extrabold tracking-tight md:text-5xl lg:text-6xl/none lg:pb-6 text-center lg:text-start">
            Majjakodeals
          </p>
          <div className="mt-[1.5rem]">
            <p className="max-w-[600px] mx-auto lg:max-w-full lg:mx-0 text-gray-700 font-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed lg:pb-4 text-center lg:text-start">
              Streamline your online food ordering and eCommerce experience with
              <span className=" text-brand px-1">Majjakodeals</span>
              all-in-one platform.
              <br />
              <span className="my-2">
                Effortlessly
                <span className=" text-brand px-1">
                  buy, order, and register
                </span>
                your business with ease.
              </span>
            </p>
          </div>
          <div className="flex mt-[1.6rem]  flex-col gap-2 md:flex-row md:justify-evenly lg:justify-start">
            <Link
              href="/restaurant"
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-white hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 "
              prefetch={false}
            >
              Explore Food
            </Link>
            <Link
              href="/bazar"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 "
              prefetch={false}
            >
              Explore Bazar
            </Link>
          </div>
        </div>
        <Image
          src="https://th.bing.com/th/id/R.d94f1610975a69b9df2333476b942a5d?rik=VF1vQ68Ct33k%2bw&pid=ImgRaw&r=0"
          width={550}
          height={550}
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-sm object-cover sm:w-full lg:order-last"
        />
      </div>
    </section>
  );
}
