/** Frequently asked questions, word for word from the existing site. */

export type FaqItem = { id: string; question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    id: "access",
    question: "How long do I keep access to a course?",
    answer:
      "Indefinitely. You buy a course once and it stays in your library. There is no subscription and nothing expires.",
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer:
      "By card, or directly from a Pakistani bank account. Your bank will send a verification code, and card payments may ask you to confirm with your bank before completing. Prices are in Pakistani rupees.",
  },
  {
    id: "refund",
    question: "Can I get a refund?",
    answer: "Yes, within {refundDays} days of purchase. [The full policy is here](/refunds).",
  },
  {
    id: "certificate",
    question: "Do I get a certificate?",
    answer:
      "When you complete a course, yes. Each certificate carries a serial number and can be verified by anyone from a public link, so it can be shown to an employer or a regulator without them taking your word for it.",
  },
  {
    id: "download",
    question: "Can I download the videos?",
    answer:
      "No. Video is streamed and each segment is authorised against your enrolment. That is a protection for the instructors whose work it is, and it is why the lessons are not on a public video site.",
  },
  {
    id: "missing-course",
    question: "I paid and my course has not appeared.",
    answer:
      "Give it a moment. A bank sometimes confirms a payment a few minutes after you leave the page, and access is granted when the confirmation arrives rather than when the page submits. If it is still missing, [tell us](/contact) and quote your order number. Do not pay a second time.",
  },
  {
    id: "delivery",
    question: "Is anything posted to me?",
    answer:
      "No. Every course is digital and is delivered inside your account the moment the payment is confirmed - there is nothing to ship, no delivery address to give us and no delivery charge. [The delivery policy](/shipping) says what that means in practice.",
  },
  {
    id: "currency",
    question: "What currency are prices in?",
    answer:
      "Pakistani rupees, on every course page and at checkout, inclusive of any tax. There is no booking fee or service charge on top. A card issued outside Pakistan is charged the converted amount by your own bank at its own rate.",
  },
  {
    id: "contact",
    question: "How do I reach a person, and when?",
    answer:
      "By phone, email or the form on the [contact page](/contact), where the number, address and opening hours are listed. We reply to most messages within one working day.",
  },
  {
    id: "teach",
    question: "Can I teach here?",
    answer: "If you practise clinically, yes. [Read what is involved](/teach).",
  },
];

/** The questions a visitor weighing up a purchase needs answered, in that order. */
export const purchaseFaqIds = ["access", "payment", "refund", "certificate", "download", "missing-course"];
