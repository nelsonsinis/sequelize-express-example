const { Router } = require('express');
const { bookController } = require('../../../controllers');

const router = Router();

router.post('/', bookController.create);
router.get('/', bookController.list);
router.get('/:id', bookController.get);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;
