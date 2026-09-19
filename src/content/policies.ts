/**
 * Policy pages, word for word from the existing site.
 * `[text](/href)` marks a link. `{refundDays}`, `{commission}`, `{minWithdrawal}`
 * are filled from the platform's live policy endpoint when the page renders.
 */

export type PolicyDocument = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const terms: PolicyDocument = {
  slug: "terms",
  title: "Terms of service",
  description: "The terms for buying, taking and publishing courses on Alignodontic Academy.",
  intro:
    "These terms cover buying and taking courses on Alignodontic Academy, and publishing them. By creating an account you agree to them.",
  sections: [
    {
      heading: "Your account",
      paragraphs: [
        "You are responsible for what happens under your account and for keeping your password to yourself. Access to a course is granted to one person; sharing an account, or sharing recordings of lessons, ends that access without a refund.",
      ],
    },
    {
      heading: "Buying a course",
      paragraphs: [
        "Prices are shown in PKR and include any tax at the rate in force when you pay. Payment is taken by our payment provider; we never store your card number. Access is granted when your bank confirms the payment, which is occasionally a few minutes after you leave the checkout page.",
        "A purchased course stays in your library indefinitely. We may update or improve a course after you buy it, and you get those changes at no extra cost. We do not delete a course somebody has bought.",
      ],
    },
    {
      heading: "Refunds",
      paragraphs: ["You can request a refund within {refundDays} days of purchase. [The refund policy sets out the detail](/refunds)."],
    },
    {
      heading: "Teaching here",
      paragraphs: [
        "Instructors keep ownership of their material and license us to host and sell it. You are responsible for having the right to teach what you publish, including any images of patients, which must be anonymised and used with consent.",
        "The platform takes {commission}% of each sale as commission; you keep the remainder. Earnings clear after the refund window closes and can then be withdrawn to a Pakistani bank account.",
        "We may suspend an account that publishes material it does not have the right to, that is clinically unsafe, or that misrepresents the qualifications of the person teaching it.",
      ],
    },
    {
      heading: "What we do not promise",
      paragraphs: [
        "Courses here are education, not clinical advice about a particular patient. Nothing on this platform replaces your own clinical judgement, your professional obligations, or the regulations you practise under.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may change these terms. If a change materially affects what you have already bought, we will tell you by email before it takes effect.",
      ],
    },
  ],
};

export const privacy: PolicyDocument = {
  slug: "privacy",
  title: "Privacy",
  description: "What Alignodontic Academy collects, why, and what it does not do with it.",
  intro: "This describes what we collect, why, and what we do not do with it. It reflects how the software is actually built.",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "Your name and email, so we can give you an account and send you receipts. Your mobile number when you pay, because your bank sends the verification code there. Which lessons you have watched and completed, so your progress and certificates work. Messages you send to an instructor. The address you connect from, in server logs.",
      ],
    },
    {
      heading: "What we do not keep",
      paragraphs: [
        "Card numbers and CVV codes are never stored. They are passed to the payment provider during the transaction and are not written to our database, our logs, or our error reports. Neither is your CNIC or bank account number after a payment completes.",
        "Passwords are stored only as a one-way hash. Nobody at Alignodontic Academy can read your password, and we will never ask you for it.",
      ],
    },
    {
      heading: "Who else sees it",
      paragraphs: [
        "Our payment provider, to take the payment. An instructor sees the name and email of students enrolled in their own courses, and any work submitted to them. Not your payment details, and nothing about courses you bought from anybody else. We do not sell personal data and we do not share it for advertising.",
      ],
    },
    {
      heading: "Coursework",
      paragraphs: [
        "Work you submit for an assignment is visible to you, to the instructor marking it, and to a platform administrator. It is not visible to other students on the course, including those enrolled in the same class.",
      ],
    },
    {
      heading: "What you can do",
      paragraphs: [
        "You can see and end every session your account has open, change your password, which signs you out everywhere, and ask us for a copy of your data or for your account to be deleted. Deleting an account does not remove records we must keep for tax and accounting, such as invoices for purchases you made.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "One cookie, used to keep you signed in. It is not used for advertising or tracking, and there is no third-party analytics on this site.",
      ],
    },
    {
      heading: "Using the Android app",
      paragraphs: [
        "The app keeps you signed in by storing a token in the device’s own secure keystore, where other apps cannot read it. Signing out removes it. It is not an advertising identifier and it is not shared with anyone.",
        "Two other companies are involved when you use the app. Google handles every purchase made inside it, because Google requires that; they see the payment and tell us only that it succeeded, and we never see your card. YouTube hosts the lesson videos, so when you play one they receive your address and which video you watched. We use their no-cookie player, which does not set tracking cookies before a video starts.",
        "You can delete your account from inside the app, under Account, or on this website at [/account/delete](/account/delete) without installing anything. If you have never bought a course, everything is erased. If you have, your name and email are removed and the account is closed permanently, while the record of the purchase itself is kept for tax and accounting with a reference that no longer identifies you.",
      ],
    },
  ],
};

export const refunds: PolicyDocument = {
  slug: "refunds",
  title: "Return and refund policy",
  description: "Ask for a refund within the refund window, without having to justify it.",
  intro:
    "If a course is not what you expected, ask for a refund within {refundDays} days of buying it. You do not have to justify the request.",
  sections: [
    {
      heading: "Returns",
      paragraphs: [
        "There is nothing to return. Courses are delivered online and nothing is posted to you, so a return is simply a refund: we end access to the course and give the money back. You do not have to send anything anywhere, and there is no restocking or return charge.",
      ],
    },
    {
      heading: "How to ask",
      paragraphs: [
        "Open the course in your purchases and use the refund link, or [contact us](/contact) with your order number. We reply to most requests within one working day.",
      ],
    },
    {
      heading: "What happens",
      paragraphs: [
        "An approved refund returns the money by the same route you paid, which usually takes a few working days to appear depending on your bank. Access to the course ends when the refund is processed.",
      ],
    },
    {
      heading: "If you bought in the Android app",
      paragraphs: [
        "Google took that payment, so Google returns it. Ask us in the same way and we issue the refund through Google Play - it goes back to whatever you paid with there, and Google emails you when it does. You can also request it yourself from your order history in the Play Store, which reaches the same place without waiting for us.",
      ],
    },
    {
      heading: "What is not refundable",
      paragraphs: [
        "A course you have already completed and taken a certificate for. A request made after the {refundDays}-day window. An account suspended for sharing course material.",
        "Beyond that, we would rather refund somebody than argue with them. If your situation does not fit the above and you think it should, tell us.",
      ],
    },
    {
      heading: "If you were charged twice",
      paragraphs: [
        "Tell us and we will refund the duplicate in full, whenever it happened and regardless of the window. If a payment appeared to fail and the money left your account, do not pay again. Send us the order number and we will find it.",
      ],
    },
  ],
};

export const shipping: PolicyDocument = {
  slug: "shipping",
  title: "Shipping and delivery",
  description: "Every course is digital and delivered to your account when payment is confirmed.",
  intro:
    "Everything sold on Alignodontic Academy is digital. There is no physical product, nothing is posted, and no courier is involved, so there is no shipping address to give us and no delivery charge to pay.",
  sections: [
    {
      heading: "What is delivered",
      paragraphs: [
        "Access to the course you bought, inside the account you bought it with. It appears in your library on this website and in the Android app, and you reach it by signing in - there is nothing to download, install or collect.",
      ],
    },
    {
      heading: "When it arrives",
      paragraphs: [
        "Immediately. Access is granted the moment your bank confirms the payment, which is usually instant. Occasionally a bank takes a few minutes to confirm, and in that case the course appears as soon as the confirmation reaches us, without you having to do anything.",
        "You do not need to stay on the page while that happens. Access is granted against your account rather than against your browser session, so closing the tab does not interrupt it.",
      ],
    },
    {
      heading: "Where we deliver",
      paragraphs: [
        "Anywhere with an internet connection. Prices are set in Pakistani rupees and a card issued outside Pakistan is charged the converted amount by your own bank at its own rate.",
      ],
    },
    {
      heading: "If it does not arrive",
      paragraphs: [
        "If a payment has left your account and the course has not appeared within fifteen minutes, [tell us](/contact) with the order number from your receipt and we will find the payment and release the course. Do not pay again. If we cannot deliver what you paid for, you are refunded in full, whatever the refund window says.",
      ],
    },
    {
      heading: "Delivery charges",
      paragraphs: ["There are none, and there is no minimum order. The price shown at checkout is the whole amount charged."],
    },
  ],
};

export const servicePolicy: PolicyDocument = {
  slug: "service-policy",
  title: "Service policy",
  description: "What a course on Alignodontic Academy includes and how it is delivered.",
  intro:
    "Alignodontic Academy sells online continuing-education courses for dental professionals. A course is a set of recorded video lessons and written material, taught by a named instructor, and bought once. This page sets out what that includes and how it is delivered.",
  sections: [
    {
      heading: "What you are buying",
      paragraphs: [
        "Access, for one person, to every lesson in the course you bought, including any lessons the instructor adds to it later. Where a course offers a certificate, it is issued automatically when you complete every lesson in it, and carries a serial number anyone can check.",
        "A course you have bought stays in your library indefinitely. We do not remove a course somebody has paid for, and updates to it cost nothing extra.",
      ],
    },
    {
      heading: "How it is delivered",
      paragraphs: [
        "Immediately and online. Access is granted as soon as your bank confirms the payment, which is usually instant and occasionally takes a few minutes. Nothing is posted to you and there is nothing to collect.",
        "Lessons are streamed and are not downloadable. You can watch them on this website in any current browser, or in the Android app, as many times as you like.",
      ],
    },
    {
      heading: "What you need",
      paragraphs: [
        "An internet connection able to carry video, and an account. Nothing is installed on your computer. The Android app is optional and gives the same courses on a phone.",
      ],
    },
    {
      heading: "Support",
      paragraphs: [
        "Questions about a course, a payment or your account go to the same place - the [contact page](/contact). We reply to most messages within one working day. Questions about the clinical content of a course reach the instructor who teaches it.",
      ],
    },
    {
      heading: "What this is not",
      paragraphs: [
        "Courses here are education, not clinical advice about a particular patient, and nothing on this platform replaces your own judgement or the regulations you practise under. We do not claim that any course satisfies a specific licensing or revalidation requirement; check that against your own regulator before relying on it.",
      ],
    },
    {
      heading: "Account sharing",
      paragraphs: [
        "Access is sold to one person. Sharing an account, or redistributing recordings of lessons, ends that access without a refund. This is the only conduct that costs somebody a course they have paid for.",
      ],
    },
    {
      heading: "Availability",
      paragraphs: [
        "The platform is intended to be available at all times, and we do not promise it will be. We take it down occasionally for maintenance, usually briefly and outside working hours in Pakistan. If a fault stops you reaching a course you have bought for a meaningful length of time, tell us - that is a refundable situation regardless of the usual {refundDays}-day window.",
      ],
    },
  ],
};

export const pricing: PolicyDocument = {
  slug: "pricing",
  title: "Pricing",
  description: "One payment per course. No subscription, no membership fee, no booking charge.",
  intro:
    "There is no subscription and no membership fee. You pay once for a course and it is yours. Nothing on this site charges you again on a schedule, and no payment method is stored to be charged later.",
  sections: [
    {
      heading: "What a course costs",
      paragraphs: [
        "Prices differ by course and are shown on the course page and again at checkout before you pay. They are in PKR and include any tax at the rate in force when you pay. There is no separate booking fee, service charge or delivery charge, so the total you are shown is the total you are charged.",
        "Some courses are free. Those are marked as such and require an account but no payment.",
      ],
    },
    {
      heading: "How you pay",
      paragraphs: [
        "By debit or credit card, on our payment provider’s secure page. Your card number is entered there rather than here and never reaches our servers. Access opens when the payment is confirmed.",
      ],
    },
    {
      heading: "Discounts",
      paragraphs: [
        "An instructor may run a sale on a course, in which case the reduced price is what you pay and the original is shown beside it. A coupon code, if you have one, is applied at checkout and the discount appears in the total before you confirm.",
      ],
    },
    {
      heading: "Buying in the Android app",
      paragraphs: [
        "Google handles payment inside the app, as Google requires for anything sold there. The price shown in the app is Google’s, converted for your country, so it can differ slightly from the PKR price on this website. Whichever you buy through, you get the same course on both.",
      ],
    },
    {
      heading: "Refunds",
      paragraphs: [
        "Refundable within {refundDays} days of purchase, without having to justify the request. [The refund policy sets out how](/refunds).",
      ],
    },
    {
      heading: "If you teach here",
      paragraphs: [
        "Instructors set their own course prices. The platform takes {commission}% of each sale as commission and you keep the remainder. Earnings clear once the refund window has closed on the sale, and can then be withdrawn to a Pakistani bank account once the balance reaches {minWithdrawal}. There is no fee to publish a course and no charge for hosting video.",
      ],
    },
  ],
};
