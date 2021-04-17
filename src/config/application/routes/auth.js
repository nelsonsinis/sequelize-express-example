const { Router } = require('express');
const { authController } = require('../../../controllers');
const { isAuthorized } = require('../middlewares');

const router = Router();

router.post('/login', authController.login);
router.post('/logout', isAuthorized, authController.logout);

module.exports = router;
