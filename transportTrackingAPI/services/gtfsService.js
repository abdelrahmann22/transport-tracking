require("dotenv").config();
const axios = require("axios");
const gtfsRealtimeBindings = require("gtfs-realtime-bindings");
const Route = require("../models/route.model");
const busController = require("../controllers/bus.controller");
const Bus = require("../models/bus.model");

const YOUR_KEY = process.env.GTFS_API_KEY;
let io;

const setSocketInstance = (socketInstance) => {
  io = socketInstance;
};

const fetchGtfsData = async (endpoint) => {
  try {
    const response = await axios.get(`${endpoint}?key=${YOUR_KEY}`, {
      responseType: "arraybuffer",
    });
    return gtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      response.data,
    );
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}: ${err}`);
    throw err;
  }
};

const fetchAndUpdateVehiclePositions = async () => {
  try {
    const feed = await fetchGtfsData(
      "https://gtfsrt.prod.obanyc.com/vehiclePositions",
    );

    const processedData = await Promise.all(
      feed.entity
        .filter(
          (entity) =>
            entity.vehicle &&
            entity.vehicle.trip &&
            entity.vehicle.trip.routeId,
        )
        .map(async (entity) => {
          const { vehicle } = entity;
          const busId = vehicle.vehicle.id;
          const location = {
            type: "Point",
            coordinates: [
              vehicle.position.longitude,
              vehicle.position.latitude,
            ],
          };
          const routeId = vehicle.trip.routeId;

          const route = await Route.findOne({ routeId });
          if (!route) {
            console.log(`Route ID ${routeId} not found.`);
            return null;
          }

          const existingBus = await Bus.findOne({ busId });
          if (existingBus) {
            await busController.updateBusLocation(busId, location);
            console.log(
              `Updated: Bus ID ${busId} to Location: ${location.coordinates}`,
            );
          } else {
            await busController.createBus(busId, location, route);
            console.log(`Created: Bus ID ${busId} for Route ID ${routeId}`);
          }

          if (io) {
            io.emit("busLocationUpdate", { busId, location });
          }

          return {
            busId,
            location,
            routeId,
            timestamp: vehicle.timestamp,
            tripId: vehicle.trip.tripId,
            startDate: vehicle.trip.startDate,
            scheduleRelationship: vehicle.trip.scheduleRelationship,
          };
        }),
    );

    // Remove null values (from routes not found) and return the processed data
    return processedData.filter(Boolean);
  } catch (error) {
    console.error("Error in fetchAndUpdateVehiclePositions:", error);
    throw error;
  }
};

const startFetching = (interval = 30000) => {
  return setInterval(async () => {
    try {
      const data = await fetchAndUpdateVehiclePositions();
      console.log(`Fetched and processed ${data.length} vehicle positions`);
    } catch (error) {
      console.error("Error in fetch interval:", error);
    }
  }, interval);
};

module.exports = {
  fetchAndUpdateVehiclePositions,
  startFetching,
  setSocketInstance,
};
