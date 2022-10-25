import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_wk6O7Cc5k3McBIG2Hut2irGs");

const Stripe = () => {
  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1Lnyd7A9KCn8yVMOn9dLgqkc", // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
    });
    error && console.log("no fue");
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     console.log("succes");
  //   }

  //   if (query.get("canceled")) {
  //     console.log("canceled");
  //   }
  // }, []);

  return (
    <section>
      <div className="product">
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <form action="http://127.0.0.1:8000/stripe/" method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        {/* <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" /> */}
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
      <button role="link" onClick={handleClick}>
        Checkout
      </button>
    </section>
  );
};

export default Stripe;
