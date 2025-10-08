import { redirect } from "@/i18n/navigation";
import { newCreemClient } from "@/integrations/creem";
import { updateOrder } from "@/services/order";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const checkoutId = searchParams.get("checkout_id");
  const requestId = searchParams.get("request_id");

  const locale = searchParams.get("locale") || "en";
  let redirectUrl = "";

  try {
    if (!checkoutId || !requestId) {
      throw new Error("invalid params");
    }

    const client = newCreemClient();

    const result = await client.creem().retrieveCheckout({
      xApiKey: client.apiKey(),
      checkoutId: checkoutId,
    });
    if (result.requestId !== requestId) {
      throw new Error("invalid checkout data");
    }

    if (!result.order || result.order.status !== "paid") {
      throw new Error("invalid order status");
    }

    if (
      !result.customer ||
      typeof result.customer === "string" ||
      !("email" in result.customer)
    ) {
      throw new Error("invalid customer email");
    }

    const order_no = result.requestId;
    const paid_email = result.customer.email;
    const paid_detail = JSON.stringify(result);

    await updateOrder({ order_no, paid_email, paid_detail });

    redirectUrl = process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/";
  } catch (e) {
    console.log("handle creem callback failed:", e);
    redirectUrl = process.env.NEXT_PUBLIC_PAY_FAIL_URL || "/";
  }

  redirect({
    href: redirectUrl,
    locale,
  });
}
