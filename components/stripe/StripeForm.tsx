"use client";
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useIsClient } from "@/lib/isClient/is-client-ctx";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51Ib3cXJ3PAVOBsRpXsxhssZYhfSM4lmw91LE6QbUNvMIayD2d0nBKpd6jl1koursni0B1yifH3LeY8MY6LId0iyv00ZWITWuu4"
);

export const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  //   const fetchClientSecret = useCallback(() => {
  //     // Create a Checkout Session
  //     return fetch("/create-checkout-session", {
  //       method: "POST",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => data.clientSecret);
  //   }, []);

  const options = { clientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

// const Return = () => {
//   const router = useRouter();
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState("");
//   const isClient = useIsClient();

//   useEffect(() => {
//     if (isClient) {
//       if (typeof window !== "undefined") {
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         const sessionId = urlParams.get("session_id");

//         fetch(`/session-status?session_id=${sessionId}`)
//           .then((res) => res.json())
//           .then((data) => {
//             setStatus(data.status);
//             setCustomerEmail(data.customer_email);
//           });
//       }
//     }
//   }, []);

//   if (status === "open") {
//     return router.push("/checkout");
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customerEmail}. If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }

//   return null;
// };
