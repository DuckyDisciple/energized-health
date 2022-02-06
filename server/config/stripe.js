const STRIPE_SECRET = process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET : process.env.DEV_STRIPE_SECRET
const stripe = require('stripe')(STRIPE_SECRET)

module.exports = stripe