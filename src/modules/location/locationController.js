import mongoose from 'mongoose';
import Location from '../../models/location';

class LocationController {
  static async createLocation(req, res) {
    try {
      const locationModel = new Location({
        ...req.body,
        _id: mongoose.Types.ObjectId()
      });
      const createdLocation = await locationModel.save();
      return res.status(201).json({
        message: 'Location created successfully!',
        location: createdLocation,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured!',
      });
    }
  }

  static async getAllLocations(req, res) {
    try {
      Location.find({}, (err, docs) => {
        if (err) throw err;
        return res.status(200).json({
          message: 'Locations retrieved successfully!',
          locations: docs,
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured!',
      });
    }
  }

  static async getLocation(req, res) {
    try {
      const { locationId } = req.params;
      const location = await Location.findOne({ _id: locationId });
      if (location) {
        return res.status(200).json({
          message: 'Location retrieved successfully!',
          location
        });
      }
      return res.status(404).json({
        message: 'Location not found!',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured!',
      });
    }
  }

  static async updateLocation(req, res) {
    try {
      const { locationId } = req.params;
      Location.findOneAndUpdate({ _id: locationId },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) throw err;
        if (doc) {
          return res.status(200).json({
            message: 'Location updated successfully!',
            location: doc
          });
        } else {
          return res.status(404).json({
            message: 'Location not found!',
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured!',
      });
    }   
  }

  static async deleteLocation(req, res) {
    try {
      const { locationId } = req.params;
      Location.findOneAndDelete({ _id: locationId }, (err, doc) => {
        if (err) throw err;
        if (doc) {
          return res.status(200).json({
            message: 'Location deleted successfully!',
            location: doc
          });
        } else {
          return res.status(404).json({
            message: 'Location not found!',
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error occured!',
      });
    }
  }   
}

export default LocationController;
