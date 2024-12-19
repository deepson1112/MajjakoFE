import { HoverEffect } from "../ui/HoverCard";

export function CardHoverEffect() {
  return (
    <div className="max-w-[1700px] mx-auto px-0 md:px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Healthy Restaurant",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
  {
    title: "Fast Delivery",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
  {
    title: "Trusted Vendors",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
  {
    title: "Local Businesses",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
  {
    title: "Customer Loyality",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
  {
    title: "Daily Offers",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius optio libero unde? Deserunt nulla tenetur fugiat voluptates, quia nam repellat provident id. Aspernatur, qui adipisci laboriosam rerum cum eaque.",
    link: "/",
  },
];
