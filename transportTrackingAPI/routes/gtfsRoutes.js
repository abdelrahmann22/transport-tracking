// routes/gtfsRoutes.js

const express = require("express");
const gtfsController = require("../controllers/gtfs.controller");

const router = express.Router();

// Route to get vehicle positions
router.get("/vehiclePositions", gtfsController.getVehiclePositions);

module.exports = router;
