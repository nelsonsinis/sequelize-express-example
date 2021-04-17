const { Router } = require('express');
const bookRoutes = require('./book');
const personRoutes = require('./person');
const authRoutes = require('./auth');
const orderRoutes = require('./order');

const router = Router();

router.use('/books', bookRoutes);
router.use('/people', personRoutes);
router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
