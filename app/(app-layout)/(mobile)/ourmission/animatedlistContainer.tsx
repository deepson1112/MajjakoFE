"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { AnimatedList } from "./animationprovider";

interface Item {
  title: string;
  image?: string;
  description: string;
}
let values = [
  {
    title: "Community Support",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Our top priority is supporting the Colorado community. Every order placed through our platform helps fund local schools, non-profit organizations, and community-driven programs. By choosing Majjakodeals, you're not just getting a meal; you're contributing to the betterment of our community.",
  },
  {
    title: "Fairness and Transparency",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "We stand against the exploitative practices of high commission fees and unfair wage distribution. At Majjakodeals, we ensure 100% of delivery fees and tips go directly to our drivers. We maintain transparent and fair fee structures for our partner restaurants, ensuring they can thrive without the burden of excessive costs. Our commitment to fairness means that everyone in the delivery chain, from the restaurant to the driver, benefits equitably.",
  },
  {
    title: "Empowerment of Local Businesses",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Our mission is to empower local businesses by providing them with a cost-effective, locally-oriented technology platform. We enable restaurants and suppliers to operate independently while still accessing a premium delivery service. By fostering a cooperative approach, we help local businesses flourish and create a vibrant, sustainable local economy. Majjakodeals is dedicated to nurturing local entrepreneurship and providing a solid foundation for businesses to succeed.",
  },
  {
    title: "Sustainability and Growth",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "We believe in creating a sustainable future for our community. By supporting local businesses, we reduce the environmental impact associated with long-distance delivery services. Our commitment to sustainability extends to our business practices, where we prioritize eco-friendly options and encourage our partners to do the same. Through our collective efforts, we aim to build a robust, self-sustaining local ecosystem that promotes long-term growth and prosperity.      ",
  },
  {
    title: "Ethical Business Practices",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Majjakodeals is built on a foundation of ethical business practices. We uphold the highest standards of integrity in all our operations, ensuring that our actions align with our values. We reject any form of exploitation and strive to create a fair and respectful environment for all our stakeholders. By championing ethical practices, we aim to set a positive example in the industry and inspire others to follow suit.",
  },
  {
    title: "Innovation and Excellence",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Our vision is to revolutionize the hospitality industry through innovation and excellence. We continuously seek out new ways to enhance our platform and improve the user experience. By integrating advanced technology with a local focus, we provide our partners with cutting-edge tools to streamline their operations. Our dedication to excellence ensures that Majjakodeals remains a trusted, reliable choice for local businesses and customers alike.",
  },
];

values = Array.from({ length: 10 }, () => values).flat();

const Notification = ({ description, image, title }: Item) => {
  return (
    <div className="grid gap-4 rounded-lg border p-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
      </div>
      <p className="text-muted-foreground line-clamp-4">{description}</p>
    </div>
  );
};

export function AnimatedListContainer() {
  return (
    <div className="relative flex max-h-[380px] min-h-[380px] w-full lg:max-w-[750px] flex-col overflow-hidden rounded-lg">
      <h2 className="text-center font-bold tracking-tighter my-4 text-3xl">
        Our Values
      </h2>
      <AnimatedList>
        {values.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
