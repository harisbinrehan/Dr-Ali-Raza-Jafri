import type { Policy } from "@/lib/catalog";

/** Fills {refundDays}, {commission}, {keepPercent} and {minWithdrawal} from the live policy. */
export function fillPolicy(text: string, policy: Policy) {
  return text
    .replaceAll("{refundDays}", String(policy.refundWindowDays))
    .replaceAll("{commission}", String(policy.commissionPercent))
    .replaceAll("{keepPercent}", String(100 - policy.commissionPercent))
    .replaceAll("{minWithdrawal}", policy.minWithdrawal.replace(/ /g, " "));
}

/** FAQ entries with policy values filled in, optionally limited to (and ordered by) ids. */
export function faqsWithPolicy(items: { id: string; question: string; answer: string }[], policy: Policy, ids?: string[]) {
  const chosen = ids ? ids.map((id) => items.find((f) => f.id === id)).filter((f) => f !== undefined) : items;
  return chosen.map((f) => ({ ...f, answer: fillPolicy(f.answer, policy) }));
}
