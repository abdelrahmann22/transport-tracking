const express = require('express');
const router = express.Router()
const routeController = require('../controllers/route.controller');

router.route('/')
	.get(routeController.getAllRoutes)
	.post(routeController.createRoute)

router.route('/:id')
	.get(routeController.getRouteById)
	.put(routeController.updateRoute)
	.delete(routeController.deleteRoute)

module.exports = router
