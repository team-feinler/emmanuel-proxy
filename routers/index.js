const checkout = require('./checkout.js');
const comparison = require('./comparison.js');
const reviews = require('./reviews.js');
const description = require('./description.js');
const errorHandling = require('../controllers/errorHandling.js');

// exports function that applies all routers to app, adds error handling at end
module.exports = app => {
  app.use(checkout);
  app.use(comparison);
  app.use(reviews);
  app.use(description);
  app.use(errorHandling);
}