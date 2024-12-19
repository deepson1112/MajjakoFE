import { cn } from "@/lib/utils";
import Marquee from "../ui/MarqueeEffect";

const reviews = [
  {
    name: "Gaia Masala And Burger",
    username: "Denver,co,8600",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
  {
    name: "Total Vegan",
    username: "Denver,co,8600",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
  {
    name: "Rio Grande",
    username: "Denver,co,8600",

    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
  {
    name: "Haveli Indian Cuisine",
    username: "Denver,co,8600",

    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
  {
    name: "Highlands Indian Cuisine",
    username: "Denver,co,8600",

    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
  {
    name: "Serene Indian Cuisine",
    username: "Denver,co,8600",

    img: "https://static.wixstatic.com/media/37c75e_efe5510dd3a24944986afdd0f26c5d0b~mv2.png/v1/fill/w_138,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/gaiamasalaburger-logo-removebg-preview.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
}: {
  img: string;
  name: string;
  username: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium ">{name}</figcaption>
          <p className="text-xs font-medium">{username}</p>
        </div>
      </div>
    </figure>
  );
};

export const MarqueeAnimation = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};
