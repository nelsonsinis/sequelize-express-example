const { Router } = require('express');
const { personController } = require('../../../controllers');
const isAuthorized = require('../middlewares/isAuthorized');

const router = Router();

router.post('/', personController.create);
router.get('/', isAuthorized, personController.get);

module.exports = router;
