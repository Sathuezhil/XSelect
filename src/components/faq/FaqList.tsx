"use client";

import { useState } from "react";

const items = [
  {
    question: "Does XSelect sell products directly?",
    answer: "No. XSelect is a discovery guide. When you choose Buy on Amazon, you leave this website and complete the order on Amazon.ae. We do not take payment or operate a cart.",
  },
  {
    question: "Will I pay more because of an affiliate link?",
    answer: "No. A qualifying purchase may earn XSelect a commission from Amazon. That commission does not change the price you pay, and a click does not guarantee that a commission is earned.",
  },
  {
    question: "Are the prices on this site live Amazon prices?",
    answer: "Only a price recorded by an editor in the last seven days, on a product that is not marked as demonstration content, is shown. Otherwise we ask you to confirm the live price on Amazon. Demonstration products never show a public price.",
  },
  {
    question: "Do you publish customer reviews or star ratings?",
    answer: "No. We do not invent reviews, ratings, or sales ranks. Pros and cons on a product page are editorial notes, and they are labelled that way.",
  },
  {
    question: "Who handles delivery and returns?",
    answer: "Amazon.ae handles checkout, delivery, and returns under Amazon's own policies. XSelect cannot change an order placed on Amazon.",
  },
  {
    question: "How do I unsubscribe from emails?",
    answer: "Email hello@xselect.ae from the address you used and ask to be removed. You can also ask an administrator to delete the subscriber record.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-lg font-semibold text-navy"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              {item.question}
              <span aria-hidden className="text-muted">{expanded ? "–" : "+"}</span>
            </button>
            {expanded && <p className="px-5 pb-5 text-sm leading-7 text-muted">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
