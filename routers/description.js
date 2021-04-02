const { forwardingController } = require('../controllers/forwarding.js');
const { asyncHandler } = require('../controllers/utils.js');
const router = require('express').Router();


// router for requests to description service
router.route('/description/:productId')
  .get(asyncHandler(forwardingController('remote', 'local')))
  .put(asyncHandler(forwardingController('remote', 'local')))
  .delete(asyncHandler(forwardingController('remote', 'local')));
router.route('/descriptions/new')
  .post(asyncHandler(forwardingController('remote', 'local')));

router.route('/descriptions/multiple')
  .get(asyncHandler(forwardingController('remote', 'local')));

module.exports = router;