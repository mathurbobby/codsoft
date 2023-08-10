require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();


router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.order_data.map((item) => {
      return {
        price_data : {
            currency:'inr',
            product_data:{
                name: item.name,
                description: item.size
            },
            unit_amount: item.price * 100,
        },
        quantity: item.qty,
      };
    });
  try {
    const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}payment/success`,
    cancel_url: `${process.env.CLIENT_URL}payment/failure`,
  });

  res.status(200).json({url : session.url, success:true});
  } catch (e) {
    res.status(500).json({error : e.message})
  }
});

module.exports = router;
