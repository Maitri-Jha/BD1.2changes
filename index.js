const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function calculateCartTotal(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateCartTotal(newItemPrice, cartTotal).toString());
});

function membershipDiscount(cartTotal, isMember) {
  if ((isMember = 'true')) {
    cartTotal = cartTotal - cartTotal * (discountPercentage / 100);
    return cartTotal;
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(membershipDiscount(cartTotal, isMember).toString());
});

function calculateTax(cartTotal) {
  cartTotal = cartTotal * (taxRate / 100);
  return cartTotal;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal).toString());
});

function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else {
    return distance / 100;
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

function calculateShippingCost(weight, distance) {
  return (weight * distance) / 10;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

function calucateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calucateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
