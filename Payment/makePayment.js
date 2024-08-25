import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const payintent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "ghs",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    if (!payintent) {
      return res.status(400).json({
        msg: "An error occurred, please try again.",
      });
    }

    

    return res.status(200).json({
      paymentIntent: payintent.client_secret,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "An error occurred.",
      error: error.message || error,
    });
  }
};
