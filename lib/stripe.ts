import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables.");
}

export const stripe = new Stripe(stripeSecretKey, {
  // Let the SDK use its built-in API version
  typescript: true,
});
