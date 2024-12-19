import Carousel from "../Carousel";
import PlaceComponent from "../PlaceSearchMarketPlace";
const apiImage = [
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1440&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "10%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1410&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "30%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "50%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "20%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "40%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "35%",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              online <span className="text-brand">Ordering.</span>
            </h1>
            <p className="mt-6 text-md sm:text-lg leading-8 text-gray-600">
              Majjakodeals isn&apos;t just online ordering, it&apos;s a movement
              revolutionizing the way you shop and dine.
            </p>
          </div>
          <PlaceComponent is_retail />
        </div>
        <Carousel carouselarray={apiImage} />
      </div>
    </main>
  );
};

export default Hero;
