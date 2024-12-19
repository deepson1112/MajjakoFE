import Link from "next/link";

export function BusinessRegister() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className=" grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl py-2 font-bold tracking-tighter md:text-4xl/tight">
            Start Your E-commerce Journey With
            <span className="text-brand font-semibold px-2">Majjakodeals</span>
          </h2>
          <p className="max-w-[600px] py-2 text-gray-700 font-medium md:text-md/relaxed lg:text-base/relaxed xl:text-md/relaxed ">
            Streamline your online store operations and take your business to
            new heights with our comprehensive e-commerce platform.
          </p>
          <Link
            href="#"
            className="inline-flex w-full md:w-[300px] h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 "
            prefetch={false}
          >
            Register Your Business
          </Link>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Seamless Integration</h3>
            <p className="text-gray-700 text-sm font-medium">
              Easily connect your existing e-commerce systems and data sources
              for a unified view of your online store.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Powerful Analytics</h3>
            <p className="text-gray-700 text-sm  font-medium">
              Gain valuable insights into your store&apos;s performance with
              real-time data and comprehensive reporting.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Scalable Infrastructure</h3>
            <p className="text-gray-700 text-sm  font-medium">
              Our platform is designed to grow with your business, ensuring you
              have the resources you need to succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
