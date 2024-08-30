require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const gtfsRoutes = require("./routes/gtfsRoutes");
const routeRoutes = require("./routes/routeRoutes");
const gtfsService = require("./services/gtfsService");
const { uploadRoutesFromJson } = require("./services/staticGtfsService");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect To DB
connectDB();

// cors
app.use(cors({ origin: "http://localhost:4200" }));

//Middleware setup
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/buses", busRoutes);
app.use("/gtfs", gtfsRoutes);
app.use("/routes", routeRoutes);

// Load the Routes
// uploadRoutesFromJson("../staticroutes.json");
//
// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A user connected");

  gtfsService.setSocketInstance(socket);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

gtfsService.startFetching(30000);

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Broke!");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
