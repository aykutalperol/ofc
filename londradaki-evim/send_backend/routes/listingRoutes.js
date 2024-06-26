// routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/ListingController');
const auth = require('../middleware/auth');

router.post('/create', auth, ListingController.create);
router.get('/all', ListingController.getAll);

module.exports = router;
