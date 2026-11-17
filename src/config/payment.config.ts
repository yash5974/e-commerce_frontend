import { loadStripe } from "@stripe/stripe-js";
import { stripePublishableKey } from "./constants";

export const stripePromise = loadStripe(stripePublishableKey);
