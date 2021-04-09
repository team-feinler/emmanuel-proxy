const { forwardingController } = require('../controllers/forwarding.js');
const { asyncHandler } = require('../controllers/utils.js');
const router = require('express').Router();
const { getCached } = require('../controllers/redis.js');


// router for requests to description service
router.route('/description/:productId')
  .get(getCached, asyncHandler(forwardingController('DESCRIPTION', 4004)))
  .put(asyncHandler(forwardingController('DESCRIPTION', 4004)))
  .delete(asyncHandler(forwardingController('DESCRIPTION', 4004)));
router.route('/descriptions/new')
  .post(asyncHandler(forwardingController('DESCRIPTION', 4004)));

router.route('/descriptions/multiple')
  .get(asyncHandler(forwardingController('DESCRIPTION', 4004)));

module.exports = router;