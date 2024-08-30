const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: { type: [Number], required: true },
  },
  lastUpdated: { type: Date, default: Date.now },
});

busSchema.index({ location: "2dsphere" });

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
