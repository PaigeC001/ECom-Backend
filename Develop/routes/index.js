const router = require('express').Router();
const apiRoutes = require('./api'); // Import routes from the `api` folder

// Use the `api` routes without an additional prefix
router.use('/', apiRoutes);

// Fallback for any routes not matching
router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>");
});

module.exports = router;
