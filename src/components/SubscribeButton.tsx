// src/components/SubscribeButton.tsx
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribeButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe?.redirectToCheckout({ sessionId: data.sessionId }) || {};
        if (error) {
          console.error("Stripe redirect error:", error.message);
        }
      } else {
        console.error("Error creating checkout session", data.error);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      {loading ? "Processing..." : "Subscribe Now"}
    </button>
  );
}
