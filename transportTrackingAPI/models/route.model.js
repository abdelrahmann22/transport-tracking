const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
	routeId: {type: String, required: true, unique: true},
	routeShortName: {type: String, required: true},
	routeLongName: {type: String, required: true},
	routeType:{type: Number, required: true},
	agencyId:{type: String},
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;

