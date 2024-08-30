// routes/gtfsRoutes.js

const express = require('express');
const gtfsController = require('../controllers/gtfs.controller');

const router = express.Router();

// Route to get vehicle positions
router.get('/vehiclePositions', gtfsController.getVehiclePositions);

// Route to get trip updates
router.get('/tripUpdates', gtfsController.getTripUpdates);

// Route to get alerts
router.get('/alerts', gtfsController.getAlerts);

module.exports = router;
