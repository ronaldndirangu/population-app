import express from 'express';
import LocationController from './locationController';
import authenticate from '../../middlewares/authenticate';
import Validator from '../../middlewares/validator';

const LocationRouter = express.Router();

LocationRouter.get(
  '/locations',
  authenticate,
  LocationController.getAllLocations,
);

LocationRouter.get(
  '/locations/:locationId',
  authenticate,
  LocationController.getLocation,
);

LocationRouter.post(
  '/locations',
  authenticate,
  Validator.checkLocationExists,
  Validator.validateLocationBody,
  LocationController.createLocation,
);

LocationRouter.patch(
  '/locations/:locationId',
  authenticate,
  LocationController.updateLocation,
);

LocationRouter.delete(
  '/locations/:locationId',
  authenticate,
  LocationController.deleteLocation
);

export default LocationRouter;
