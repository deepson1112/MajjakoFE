import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MainFaqs() {
  const FAQList = [
    {
      q: "How does Majjakodeals support local businesses?",
      a: "We empower local businesses by providing a premium delivery platform with minimal costs. We ensure 100% of delivery fees and tips go directly to our drivers, and we maintain fair fee structures for our partner restaurants. By fostering a cooperative approach, we help local businesses thrive and contribute to a vibrant local economy.",
      href: "/faqs",
    },
    {
      q: "What makes Majjakodeals different from other delivery services?",
      a: "Unlike other delivery services that impose high commission fees and withhold a significant portion of drivers' earnings, Majjakodeals stands for fairness and transparency. We transfer all delivery fees and tips to our drivers and keep costs low for restaurants. Our platform is owned and operated by local community members, making us a truly community-focused service.",
      href: "/faqs",
    },
    {
      q: " How can I place an order with Majjakodeals?",
      a: "You can place an order through our website. Simply browse the available restaurants, select your items, and proceed to checkout. For large orders or special events, you can contact our customer service team for personalized assistance.",
      href: "/faqs",
    },
    {
      q: "How are delivery fees and tips handled at Majjakodeals?",
      a: "At Majjakodeals, 100% of delivery fees and tips go directly to our drivers. This ensures that our delivery partners are fairly compensated for their work, fostering a respectful and supportive community environment.",
      href: "/faqs",
    },
    {
      q: "How can I get involved with Majjakodeals?",
      a: "You can get involved with Majjakodeals by placing orders, spreading the word about our mission, and supporting local businesses. Additionally, we welcome volunteers and partners who are passionate about community support and sustainability. Contact us to learn more about how you can contribute.",
      href: "/faqs",
    },
    {
      q: "What makes Majjakodeals different from other delivery services?",
      a: "Unlike other delivery services that impose high commission fees and withhold a significant portion of drivers' earnings, Majjakodeals stands for fairness and transparency. We transfer all delivery fees and tips to our drivers and keep costs low for restaurants. Our platform is owned and operated by local community members, making us a truly community-focused service.",
      href: "/faqs",
    },
  ];

  return (
    <section className="relative">
      <div className="py-8  max-w-screen-xl mx-auto px-4 md:px-8">
        <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
          {FAQList.map((item, idx) => (
            <li key={idx} className="space-y-3">
              <summary className="flex items-center justify-between font-semibold text-zinc-900">
                {item.q}
              </summary>
              <p
                dangerouslySetInnerHTML={{ __html: item.a }}
                className="text-gray-700 text-sm font-medium line-clamp-2"
              ></p>
              <Link
                href={item.href}
                className="flex cursor-pointer items-center gap-x-1 text-sm text-slate-600 hover:text-slate-400 duration-150 font-medium"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
