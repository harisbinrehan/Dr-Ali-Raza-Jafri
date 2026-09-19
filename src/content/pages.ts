/**
 * Copy for the home, about and teach pages, word for word from the existing
 * site. Only the arrangement is new.
 */

export const home = {
  eyebrow: "Continuing dental education",
  headline: ["Learn the case,", "not the slide deck"],
  intro:
    "Courses for practising dentists in Pakistan: clear aligners, cephalometrics and infection control. Taught by clinicians who still see patients, and still decline cases.",
  primaryCta: { label: "Browse courses", href: "/courses" },
  secondaryCta: { label: "Teach with us", href: "/teach" },
  subjects: { heading: "Subjects", body: "Everything published so far." },
  courses: { heading: "The courses", body: "Recorded chairside and in the lab, not in front of a slide deck." },
  instructor: { eyebrow: "Taught by a clinician in practice" },
  promise: { heading: "What you get for the money", moreLabel: "More questions" },
};

/** The three commitments shown on the home page ("What you get for the money"). */
export const promises = [
  {
    title: "Buy once, keep it",
    short: "Buy once, keep it. No subscription.",
    body: "No subscription. A course you buy stays in your library, including the updates an instructor makes to it later.",
  },
  {
    title: "A certificate that checks out",
    short: "Certificates with a publicly verifiable serial.",
    body: "Each one carries a serial anyone can verify from a public link, so it stands up to being shown to an employer.",
  },
  {
    title: "Refundable",
    short: "Refundable within {refundDays} days, no justification needed.",
    body: "Changed your mind? Ask within the refund window and we return it. You do not have to justify it.",
  },
];

/** What every course includes, as listed beside the price on a course page. */
export const courseIncludes = {
  keep: "Yours to keep, with no subscription",
  refund: "Refundable for {refundDays} days",
  certificate: "Certificate on completion",
};

export const about = {
  title: "About Alignodontic Academy",
  lead: "Continuing dental education from clinicians who still see patients.",
  body: [
    "Alignodontic Academy publishes courses for practising dentists and dental students in Pakistan. The teaching is clinical: case selection, technique, and the decisions that determine whether treatment finishes the way it was planned.",
    "Courses are written and recorded by clinicians who work in practice, not by full-time course producers. That is the whole point of the platform. The person explaining why a case was declined is somebody who declined it.",
  ],
  pullQuote: "The person explaining why a case was declined is somebody who declined it.",
  howItWorks: {
    heading: "How it works",
    body: [
      "You buy a course once and keep access to it. There is no subscription, and no course expires out from under you. Progress is tracked lesson by lesson, and a certificate is issued when a course is completed, and it can be verified from a public link, so it can be shown to anyone who asks.",
      "Video is hosted rather than embedded from a public platform, and each segment is authorised individually against your enrolment. That is a protection for the instructors whose work it is.",
    ],
  },
  teaching: {
    heading: "Teaching here",
    body: "Instructors keep the majority of what their courses earn, are paid out to a Pakistani bank account, and set their own prices. [The details are on the instructor page](/teach).",
  },
};

export const teach = {
  title: "Teach on Alignodontic Academy",
  lead: "For clinicians who want to teach what they actually do.",
  intro:
    "We publish courses by dentists in practice. If you have a technique, a workflow or a set of cases worth teaching, you can build a course here, price it yourself, and be paid to a Pakistani bank account.",
  highlights: [
    { title: "You keep {keepPercent}%", body: "The platform's commission is {commission}% of each sale. Nothing else is deducted." },
    { title: "Paid to your bank", body: "Withdraw to a Pakistani bank account once your cleared balance reaches {minWithdrawal}." },
    {
      title: "Your work is protected",
      body: "Video is streamed with each segment authorised individually. Lessons are not on a public video site and cannot be linked to.",
    },
  ],
  sections: [
    {
      heading: "What is involved",
      paragraphs: [
        "You record the lessons and write the course. The platform handles payment, access, certificates, student questions and refunds. Course pages, quizzes and assignments are built in the instructor dashboard.",
        "Every instructor is reviewed before their first course is published. That review is about clinical credibility: we ask what you practise and where. It is the reason a student can trust that the person teaching has done the work.",
      ],
    },
    {
      heading: "Getting paid",
      paragraphs: [
        "Earnings from a sale clear after the refund window closes, so a refunded purchase never has to be clawed back from money you have already withdrawn. Cleared balances can be withdrawn at any time, and every movement is itemised in the earnings ledger.",
      ],
    },
  ],
  apply: {
    heading: "Apply to teach",
    body: "Create an account, then tell us about your practice. We review every application before a first course can be published.",
    primary: { label: "Create an account", href: "/register" },
    secondary: { label: "Ask a question first", href: "/contact" },
  },
};

export const contactPage = {
  title: "Contact us",
  lead: "For questions about a course, a payment, or teaching with us.",
  locationHeading: "Where we are",
  formHeading: "Send a message",
};
