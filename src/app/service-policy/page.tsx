import { servicePolicy } from "@/content/policies";
import { policyRoute } from "@/components/layout/policyRoute";

const route = policyRoute(servicePolicy);

export const revalidate = 300;
export const metadata = route.metadata;
export default route.Page;
