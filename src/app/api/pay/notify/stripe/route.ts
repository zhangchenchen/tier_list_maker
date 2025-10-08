import Stripe from "stripe";
import { respOk } from "@/lib/resp";
import { handleCheckoutSession, handleInvoice } from "@/services/stripe";

export async function POST(req: Request) {
  try {
    const stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripePrivateKey || !stripeWebhookSecret) {
      throw new Error("invalid stripe config");
    }

    const stripe = new Stripe(stripePrivateKey, {
      // Cloudflare Workers use the Fetch API for their API requests.
      httpClient: Stripe.createFetchHttpClient(),
    });

    const sign = req.headers.get("stripe-signature") as string;
    const body = await req.text();
    if (!sign || !body) {
      throw new Error("invalid notify data");
    }

    const event = await stripe.webhooks.constructEventAsync(
      body,
      sign,
      stripeWebhookSecret
    );

    console.log("stripe notify event: ", event);

    switch (event.type) {
      case "checkout.session.completed": {
        // get checkout session
        const session = event.data.object;
        await handleCheckoutSession(stripe, session);
        break;
      }

      case "invoice.payment_succeeded": {
        // get invoice
        const invoice = event.data.object;
        await handleInvoice(stripe, invoice);
        break;
      }

      default:
        console.log("not handle event: ", event.type);
    }

    return respOk();
  } catch (e: any) {
    console.log("stripe notify failed: ", e);
    return Response.json(
      { error: `handle stripe notify failed: ${e.message}` },
      { status: 500 }
    );
  }
}
