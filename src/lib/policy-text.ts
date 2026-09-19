import type { Policy } from "@/lib/catalog";

/** Fills {refundDays}, {commission}, {keepPercent} and {minWithdrawal} from the live policy. */
export function fillPolicy(text: string, policy: Policy) {
  return text
    .replaceAll("{refundDays}", String(policy.refundWindowDays))
    .replaceAll("{commission}", String(policy.commissionPercent))
    .replaceAll("{keepPercent}", String(100 - policy.commissionPercent))
    .replaceAll("{minWithdrawal}", policy.minWithdrawal.replace(/ /g, " "));
}
