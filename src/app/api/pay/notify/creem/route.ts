import { updateOrder } from "@/services/order";
import { respOk } from "@/lib/resp";

export async function POST(req: Request) {
  try {
    const creemWebhookSecret = process.env.CREEM_WEBHOOK_SECRET;

    if (!creemWebhookSecret) {
      throw new Error("invalid creem config");
    }

    const sign = req.headers.get("creem-signature") as string;
    const body = await req.text();
    if (!sign || !body) {
      throw new Error("invalid notify data");
    }

    const computedSignature = await generateSignature(body, creemWebhookSecret);

    if (computedSignature !== sign) {
      throw new Error("invalid signature");
    }

    const event = JSON.parse(body);

    switch (event.eventType) {
      case "checkout.completed": {
        const session = event.object;

        if (
          !session ||
          !session.metadata ||
          !session.metadata.order_no ||
          !session.order ||
          session.order.status !== "paid"
        ) {
          throw new Error("invalid session");
        }

        const order_no = session.metadata.order_no;
        const paid_email = session.customer?.email || "";
        const paid_detail = JSON.stringify(session);

        await updateOrder({ order_no, paid_email, paid_detail });
        break;
      }

      default:
        console.log("not handle event: ", event.eventType);
    }

    return respOk();
  } catch (e: any) {
    console.log("creem notify failed: ", e);
    return Response.json(
      { error: `handle creem notify failed: ${e.message}` },
      { status: 500 }
    );
  }
}

async function generateSignature(
  payload: string,
  secret: string
): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(payload);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, messageData);

    const signatureArray = new Uint8Array(signature);
    return Array.from(signatureArray)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error: any) {
    throw new Error(`Failed to generate signature: ${error.message}`);
  }
}
