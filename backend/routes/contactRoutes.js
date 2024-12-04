
const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');

router.post('/contact', createContact);

module.exports = router;