export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { getFaqs } from "../api/apiFetchServices";

interface FaqType {
  id: number;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}
const FAQList = [
  {
    question: "How does Majjakodeals support local businesses?",
    answer:
      "We empower local businesses by providing a premium delivery platform with minimal costs. We ensure 100% of delivery fees and tips go directly to our drivers, and we maintain fair fee structures for our partner restaurants. By fostering a cooperative approach, we help local businesses thrive and contribute to a vibrant local economy.",
    value: "item-1",
  },
  {
    question: "What makes Majjakodeals different from other delivery services?",
    answer:
      "Unlike other delivery services that impose high commission fees and withhold a significant portion of drivers' earnings, Majjakodeals stands for fairness and transparency. We transfer all delivery fees and tips to our drivers and keep costs low for restaurants. Our platform is owned and operated by local community members, making us a truly community-focused service.",
    value: "item-2",
  },
  {
    question: " How can I place an order with Majjakodeals?",
    answer:
      "You can place an order through our website. Simply browse the available restaurants, select your items, and proceed to checkout. For large orders or special events, you can contact our customer service team for personalized assistance.",
    value: "item-3",
  },
  {
    question: "How are delivery fees and tips handled at Majjakodeals?",
    answer:
      "At Majjakodeals, 100% of delivery fees and tips go directly to our drivers. This ensures that our delivery partners are fairly compensated for their work, fostering a respectful and supportive community environment.",
    value: "item-4",
  },
  {
    question: "How can I get involved with Majjakodeals?",
    answer:
      "You can get involved with Majjakodeals by placing orders, spreading the word about our mission, and supporting local businesses. Additionally, we welcome volunteers and partners who are passionate about community support and sustainability. Contact us to learn more about how you can contribute.",
    value: "item-5",
  },
];

export default async function Page() {
  const bazarPageContents = (await getFaqs()) as FaqType[];

  if (!bazarPageContents) return <div>NO Content</div>;
  return (
    <div className="bg-gray-50">
      {/* <HoverImage /> */}
      <section id="faq" className="px-6 py-10">
        <div className="text-[3rem] md:text-[4rem] font-bold text-slate-700 w-full text-center py-6">
          Frequently Asked Questions
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-6 AccordionRoot"
        >
          {bazarPageContents.map(({ question, answer, id }) => (
            <AccordionItem key={id} value={`${id}`}>
              <AccordionTrigger
                className={
                  "text-left text-[1rem] !no-underline font-semibold uppercase"
                }
              >
                {question}
              </AccordionTrigger>

              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="text-xl font-bold text-brand w-full text-center uppercase my-10">
          Still have questions?
          <Link
            href="/contact"
            className="text-primary transition-all border-primary px-2 hover:border-b-2"
          >
            Contact us
          </Link>
        </h3>
      </section>
    </div>
  );
}
