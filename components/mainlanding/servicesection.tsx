import { Bike, Car, Store, Utensils } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Image from "next/image";
import { PinContainer } from "../ui/CardPinEffect";

interface FeatureProps {
  image: string;
  title: string;
  link: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1598515213381-80d77efcdf32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Food",
    link: "/marketplace",
    description: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bazar",
    link: "/bazar",
    description: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Rental",
    link: "/rental",
    description: "Comming Soon!!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Vacation",
    link: "/vacation",
    description: "Comming Soon!!",
  },
];

export const ServiceSection = () => {
  return (
    // <section className="hidden lg:block relative text-center bg-transparent -my-32 -mb-16">
    <section className="hidden lg:block relative text-center bg-transparent -my-12">
      <div className="grid grid-cols-4 lg:gap-0 xl:gap-0 max-w-5xl mx-auto">
        {features.map(({ image, title, link, description }: FeatureProps) => (
          <PinContainer key={title} title={title} href={link}>
            <Card className="bg-white lg:h-56 lg:w-52">
              <CardHeader>
                <CardTitle className="grid gap-1 lg:gap-4 text-black text-xs lg:text-lg uppercase tracking-wider place-items-center">
                  <div className="bg-zinc-100 rounded-full">
                    <Image
                      width={1000}
                      height={1000}
                      src={image}
                      alt="Product"
                      className="lg:h-28 lg:w-28 bg-center rounded-full object-cover"
                    />
                  </div>
                  {title}
                </CardTitle>
                <p className="py-0.5 text-xs"> {description}</p>
              </CardHeader>
            </Card>
          </PinContainer>
        ))}
      </div>
    </section>
  );
};
