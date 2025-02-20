const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controllers/travelController');

router.post('/suggestions', getSuggestions);

module.exports = router;
