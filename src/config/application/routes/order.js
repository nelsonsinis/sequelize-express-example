const { Router } = require('express');
const { isAuthorized } = require('../middlewares');
const { orderController } = require('../../../controllers');

const router = Router();

router.post('/', isAuthorized, orderController.create);

module.exports = router;
