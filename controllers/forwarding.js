const {asyncHandler} = require('./utils.js');

// takes a remote url for foreign service for deployment and a local port in development
// returns endpoint that forwards request to either remote or local args
exports.forwardingController = (remote = 'forward requres here', local ='fallback port if local') => (req, res, next) => {
  //TODO handle forwarding, body, headers, routes
  console.log('forwarding controller')
  res.json(`${req.method}@${req.originalUrl} works. remote: ${ remote } local: ${ local }`); // test to make sure it works
}