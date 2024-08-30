const Bus = require("../models/bus.model");
const gtfsService = require('../services/gtfsService');


exports.getVehiclePositions = async(req, res)=>{
	try{
		const vehiclePositions = await gtfsService.fetchAndUpdateVehiclePositions();
		res.status(200).json(vehiclePositions);
	}catch(err){
		res.status(500).json({ message: 'Error fetching vehicle positions', error: err.message });
	}
};

exports.getTripUpdates = async(req, res)=>{
	try{
		const tripUpdates = await gtfsService.fetchTripUpdates();;
		res.status(200).json(tripUpdates);
	}catch(err){
		res.status(500).json({ message: 'Error fetching trip updates', error: error.message });
	}
};

exports.getAlerts = async(req, res) => {
	try{
		const alerts = await gtfsService.fetchAlerts();
		res.status(200).json(alerts);
	}catch(err){
		res.status(500).json({ message: 'Error fetching alerts', error: error.message });
	}
}
