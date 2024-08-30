const Bus = require("../models/bus.model");
const Route = require("../models/route.model");

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("routeId");
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching buses ", err });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findOne({ _id: req.params.id }).populate("routeId");
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bus ", err });
  }
};

exports.createBus = async (busId, location, routeId) => {
  // const { busId, routeId, location } = req.body;

  try {
    const newBus = new Bus({
      busId,
      routeId,
      location,
    });
    const savedBus = await newBus.save();
    console.log(`Created new Bus ID: ${busId}`);
    return savedBus;
  } catch (err) {
    console.error("Error creating bus:", err);
    throw err;
  }
};

exports.updateBusLocation = async (busId, location) => {
  try {
    const updatedBus = await Bus.findOneAndUpdate(
      { busId },
      { location, lastUpdated: new Date() },
      { new: true },
    );

    if (!updatedBus) throw new Error("Bus not found");
    console.log(`Bus ID ${busId} updated successfully.`);
    return updatedBus;
  } catch (error) {
    console.error("Error updating bus location:", error);
    throw error;
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ messaege: "Bus not found" });
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ message: "Error deleting bus", err });
  }
};
