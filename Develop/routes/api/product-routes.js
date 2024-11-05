const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [Category, Tag],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return { product_id: product.id, tag_id };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// PUT update a product by ID
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({ where: { product_id: req.params.id } })
          .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
              .filter((tag_id) => !productTagIds.includes(tag_id))
              .map((tag_id) => ({ product_id: req.params.id, tag_id }));

            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
              .map(({ id }) => id);

            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          });
      }
      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;