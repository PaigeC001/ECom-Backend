const router = require('express').Router();
const productRoutes = require('./product-routes');
const categoryRoutes = require('./category-routes');
const tagRoutes = require('./tag-routes');

// Register each route file under its respective path
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
