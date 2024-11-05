const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;