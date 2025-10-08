import Stripe from "stripe";
import { updateOrder, updateSubOrder } from "./order";

// handle checkout session completed
export async function handleCheckoutSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  try {
    // not handle unpaid session
    if (session.payment_status !== "paid") {
      throw new Error("not handle unpaid session");
    }

    // get session metadata
    const metadata = session.metadata;
    if (!metadata || !metadata.order_no) {
      throw new Error("no metadata in session");
    }

    const subId = session.subscription as string;
    if (subId) {
      // handle subscription
      const subscription = await stripe.subscriptions.retrieve(subId);

      // update subscription metadata
      await stripe.subscriptions.update(subId, {
        metadata: metadata,
      });

      const item = subscription.items.data[0];

      metadata["sub_id"] = subId;
      metadata["sub_times"] = "1";
      metadata["sub_interval"] = item.plan.interval;
      metadata["sub_interval_count"] = item.plan.interval_count.toString();
      metadata["sub_cycle_anchor"] =
        subscription.billing_cycle_anchor.toString();
      metadata["sub_period_start"] =
        subscription.current_period_start.toString();
      metadata["sub_period_end"] = subscription.current_period_end.toString();

      // update subscription first time paid order
      await updateSubOrder({
        order_no: metadata.order_no,
        user_email: metadata.user_email,
        sub_id: subId,
        sub_interval_count: Number(metadata.sub_interval_count),
        sub_cycle_anchor: Number(metadata.sub_cycle_anchor),
        sub_period_end: Number(metadata.sub_period_end),
        sub_period_start: Number(metadata.sub_period_start),
        sub_times: Number(metadata.sub_times),
        paid_detail: JSON.stringify(session),
      });

      return;
    }

    // update one-time payment order
    const order_no = metadata.order_no;
    const paid_email =
      session.customer_details?.email || session.customer_email || "";
    const paid_detail = JSON.stringify(session);

    await updateOrder({ order_no, paid_email, paid_detail });
  } catch (e) {
    console.log("handle session completed failed: ", e);
    throw e;
  }
}

// handle invoice payment succeeded
export async function handleInvoice(stripe: Stripe, invoice: Stripe.Invoice) {
  try {
    // not handle unpaid invoice
    if (invoice.status !== "paid") {
      throw new Error("not handle unpaid invoice");
    }

    const subId = invoice.subscription as string;
    // not handle none-subscription payment
    if (!subId) {
      throw new Error("not handle none-subscription payment");
    }

    // not handle first subscription, because it's be handled in session completed event
    if (invoice.billing_reason === "subscription_create") {
      return;
    }

    // get subscription
    const subscription = await stripe.subscriptions.retrieve(subId);

    let metadata = subscription.metadata;

    if (!metadata || !metadata.order_no) {
      // get subscription session metadata
      const checkoutSessions = await stripe.checkout.sessions.list({
        subscription: subId,
      });

      if (checkoutSessions.data.length > 0) {
        const session = checkoutSessions.data[0];
        if (session.metadata) {
          metadata = session.metadata;
          await stripe.subscriptions.update(subId, {
            metadata: metadata,
          });
        }
      }
    }

    if (!metadata || !metadata.order_no) {
      throw new Error("no metadata in subscription");
    }

    // get subscription item
    const item = subscription.items.data[0];

    const anchor = subscription.billing_cycle_anchor;
    const start = subscription.current_period_start;
    const end = subscription.current_period_end;

    const periodDuration = end - start;
    const subTimes = Math.round((start - anchor) / periodDuration) + 1;

    metadata["sub_id"] = subId;
    metadata["sub_times"] = subTimes.toString();
    metadata["sub_interval"] = item.plan.interval;
    metadata["sub_interval_count"] = item.plan.interval_count.toString();
    metadata["sub_cycle_anchor"] = subscription.billing_cycle_anchor.toString();
    metadata["sub_period_start"] = subscription.current_period_start.toString();
    metadata["sub_period_end"] = subscription.current_period_end.toString();

    // create renew order
    await updateSubOrder({
      order_no: metadata.order_no,
      user_email: metadata.user_email,
      sub_id: subId,
      sub_interval_count: Number(metadata.sub_interval_count),
      sub_cycle_anchor: Number(metadata.sub_cycle_anchor),
      sub_period_end: Number(metadata.sub_period_end),
      sub_period_start: Number(metadata.sub_period_start),
      sub_times: Number(metadata.sub_times),
      paid_detail: JSON.stringify(invoice),
    });
  } catch (e) {
    console.log("handle payment succeeded failed: ", e);
    throw e;
  }
}
