// src/app/dashboard/subscribe/page.tsx
"use client";
import PageTransition from "../../../components/PageTransition";
import SubscribeButton from "../../../components/SubscribeButton";

export default function SubscribeDashboard() {
  // Replace this with the actual price ID from your Stripe dashboard
  const priceId = "price_1YourPriceIdHere";

  return (
    <PageTransition>
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p className="mt-2 text-lg">
          Enjoy unlimited access to advanced AI tools and exclusive features.
        </p>
        <div className="mt-4">
          <SubscribeButton priceId={priceId} />
        </div>
      </div>
    </PageTransition>
  );
}
