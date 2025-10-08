import Stripe from "stripe";

export class StripeClient {
  private client: Stripe;
  private config: {
    privateKey: string;
  };

  constructor({ privateKey }: { privateKey?: string }) {
    if (!privateKey) {
      privateKey = process.env.STRIPE_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error("STRIPE_PRIVATE_KEY is not set");
      }
    }

    this.config = {
      privateKey,
    };

    this.client = new Stripe(privateKey, {
      // Cloudflare Workers use the Fetch API for their API requests.
      httpClient: Stripe.createFetchHttpClient(),
    });
  }

  stripe() {
    return this.client;
  }

  privateKey() {
    return this.config.privateKey;
  }
}

export function newStripeClient({
  privateKey,
}: {
  privateKey?: string;
} = {}): StripeClient {
  return new StripeClient({
    privateKey,
  });
}
