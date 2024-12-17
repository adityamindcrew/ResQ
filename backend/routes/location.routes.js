const express = require('express');
const locationController = require('../controllers/location.controller');


const router = express.Router();
router.get('/getLocation/:type', locationController.getLocations);


// Export the router
module.exports = router;