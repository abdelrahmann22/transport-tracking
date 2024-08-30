const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const Route = require("../models/route.model");

const loadRoutes = async (filePath) => {
  const routes = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      routes.push({
        routeId: row.route_id,
        routeShortName: row.route_short_name,
        routeLongName: row.route_long_name,
        routeType: Number(row.route_type),
        agencyId: row.agency_id,
      });
    })
    .on("end", async () => {
      try {
        await Route.insertMany(routes);
        console.log("Routes loaded successfully");
      } catch (err) {
        console.error("Error saving routes to the database", err);
      }
    })
    .on("error", (err) => {
      console.error("Error reading routes", err);
    });
};

const uploadRoutesFromJson = async (filePath) => {
  try {
    const fileData = fs.readFileSync(
      path.resolve(__dirname, filePath),
      "utf-8",
    );
    const routes = JSON.parse(fileData);
    await Route.insertMany(routes);
    console.log("Routes uploaded successfully");
  } catch (err) {
    console.error("Error uploading routes to the database", err);
  }
};

module.exports = { loadRoutes, uploadRoutesFromJson };
