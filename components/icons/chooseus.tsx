import {
  Bike,
  HeartHandshake,
  Megaphone,
  Radar,
  Store,
  UtensilsCrossed,
} from "lucide-react";

interface SVGDefinition {
  name: string;
  href?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
export const chooseusicons = [
  {
    name: "Restaurant",

    icon: (props: any) => <UtensilsCrossed {...props} />,
  },
  {
    name: "Delivery",

    icon: (props: any) => <Bike {...props} />,
  },
  {
    name: "Vendor",

    icon: (props: any) => <Store {...props} />,
  },
  {
    name: "Local",

    icon: (props: any) => <Radar {...props} />,
  },
  {
    name: "Loyality",

    icon: (props: any) => <HeartHandshake {...props} />,
  },
  {
    name: "Offers",

    icon: (props: any) => <Megaphone {...props} />,
  },
];
