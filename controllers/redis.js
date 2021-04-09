const redis = require("redis");
const client = new redis.createClient();
const { asyncHandler, ErrAPI } = require('./utils.js');
const bottomRange = 9000000;
const topRange = 9350000;

// check connection
client.on("ready", () => console.log('redis ready'));
client.on("error", err => console.log(err));

// give promise functionality to redis actions
const promisify = fn => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  })
});

//promisify get, set and del. using hashes
const getter = promisify(client.get.bind(client));
const setter = promisify(client.set.bind(client));
const deleter = promisify(client.del.bind(client));

// check if path is within the given productId range for caching
const inRange = (productId) => {
  const parsed = parseInt(productId)
  let check = bottomRange <= parsed && parsed <= topRange && !isNaN(parsed);
  return check; // return all values as a tuple
}

// path including productId used as key in order to differentiate all routes
// check cache for a request
exports.getCached = asyncHandler( async (req, res, next) => {
  // check if  value exists in cache and send if it does
  const { path, params: { productId } } = req;
  let cachedResult;
  let cacheIt = inRange(productId);
  if (cacheIt) {
    cachedResult = JSON.parse(await getter(path));
  }

  // if was in range and cache returned result
  if(cacheIt && cachedResult !== null) {
    res.json({cachedResult});
  } 
  // else continue and it will be added in getter
  else next();
});

// function used in endpoints to set results to cache
exports.setCache = async ( path, productId, value) => {
  const cacheIt = inRange(productId);
  if(cacheIt) {
    await setter(path, value).catch(err => { throw err });
  }
};

// remove a key from cache if underylying data is updated or deleted
exports.invalidateKey = async (path, productId) => {
  const invalidateIt = inRange(productId);
  if(invalidateIt) {
    await deleter(path).catch(err => { throw err });
  }
};