import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
const PayPal = () => {
  let { user } = useContext(AuthContext);

  //const { product } = props;
  const [error, setError] = useState(null);
  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("thanks");
  }
  if (error) {
    alert("error");
  }

  const test = {
    describe: "testing",
    price: 20.2,
  };
  return (
    <div className="paypal-btn">
      <PayPalButtons
        onClick={(data, actions) => {
          const hasAlreadyCourse = false;
          if (hasAlreadyCourse) {
            setError("ya compraste");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: test.describe,
                amount: {
                  value: test.price,
                },
              },
            ],
            // purchase_units: [
            //   {
            //     reference_id: "PUHF",
            //     description: "Some description",
            //     custom_id: "Something7364",
            //     soft_descriptor: "Great description 1",
            //     amount: {
            //       currency_code: "USD",
            //       value: "200.00",
            //       breakdown: {
            //         item_total: {
            //           currency_code: "USD",
            //           value: "200.00",
            //         },
            //       },
            //     },
            //     items: [
            //       {
            //         name: "Item 1",
            //         description: "The best item ever",
            //         sku: "xyz-2654",
            //         unit_amount: {
            //           currency_code: "USD",
            //           value: "100.00",
            //         },
            //         quantity: "1",
            //       },
            //     ],
            //   },
            // ],
          });
        }}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          console.log("order", order);
          handleApprove(data.orderID);

          helpHttp()
            .put(`http://127.0.0.1:8000/api/makepremium/${user.user_id}`)
            .then((res) => {
              console.log(res);
              if (!res.err) {
                console.log("no error");
                //   setLoading(false);
              } else {
                console.log(res);
                // setError(res);
              }
            });
          //return action.order.capture();
        }}
        onCancel={() => {
          // button.updateProps();
        }}
        onError={(err) => {
          setError(err);
          console.log("paypal error");
        }}
        style={{
          layout: "horizontal",
          color: "gold",
          shape: "pill",
        }}
      />
    </div>
  );
};

export default PayPal;
