const router = require('express').Router();

// Require index file of controllers
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes');

// Routing the all available controllers
router.use('/auth', userRoutes);
router.use('/notes', notesRoutes);

module.exports = router;
