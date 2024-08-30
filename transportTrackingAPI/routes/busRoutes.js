const express = require("express");
const busController = require("../controllers/bus.controller");

const router = express.Router();

router.route("/").get(busController.getAllBuses).post(busController.createBus);

router
  .route("/:id")
  .get(busController.getBusById)
  .put(busController.updateBusLocation)
  .delete(busController.deleteBus);
module.exports = router;
