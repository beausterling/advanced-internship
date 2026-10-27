import { getStripePayments } from "@invertase/firestore-stripe-payments";
import { app } from "./init";

// these have to match the collections set in the Run Payments with Stripe extension
export const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});
