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
