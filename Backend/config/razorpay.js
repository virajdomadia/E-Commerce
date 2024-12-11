const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // From .env
  key_secret: process.env.RAZORPAY_KEY_SECRET, // From .env
});

module.exports = razorpay;
