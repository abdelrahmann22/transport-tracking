const Route = require("../models/route.model");

exports.getAllRoutes = async(req, res)=>{
	try{
		const routes = await Route.find();
		res.status(200).json(routes)
	}catch(err){
		res.status(500).json({ message: 'Error fetching routes', error: err.message });
	}
};

exports.getRouteById = async(req, res) => {
	try{
		const route = await Route.findById(req.params.id);
		if(!route) return res.status(404).json({ message: 'Route not found' });
		res.status(200).json(route);
	}catch(err){
		res.status(500).json({ message: 'Error fetching route', error: err.message });
	}
}

exports.createRoute = async(req, res)=>{
	const { routeId, routeShortName, routeLongName, routeType, agencyId, geometry } = req.body;

	const newRoute = new Route({
		routeId, 
		routeShortName,
		routeLongName,
		routeType,
		agencyId,
	});

	try{
		const savedRoute = await newRoute.save();
		res.status(201).json(savedRoute);
	}catch(error){
		res.status(500).json({ message: 'Error creating route', error: err.message });
	}
};

exports.updateRoute = async(req, res)=>{
	const routeId = req.params.id;

	try{
		const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, {new: true});
		if(!updatedRoute) return res.status(404).json({ message: 'Route Not Found' });
		res.status(200).json(updatedRoute);
	}catch(err){
		res.statuts(500).json({ message: 'Error updating route', error: err.message});
	}
};

exports.deleteRoute = async (req, res) => {
	const routeId = req.params.id;

	try{
		const deletedRoute = await Route.findByIdAndDelete(routeId)
		if(!deletedRoute) return res.status(404).json({ message: 'Route not found'});
		res.status(200).json({ message: 'Route deleted successfully' });
	}catch(err){
		res.status(500).json({ message: 'Error deleting route', error: err.message });
	}
}
