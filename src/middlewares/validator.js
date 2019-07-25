import Joi from 'joi';
import mongoose from 'mongoose';
import Location from '../models/location';
import User from '../models/user';

class Validator {
  static async validateLocationBody(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      females: Joi.string().required(),
      males: Joi.string().required()
    };
    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });
      return next();
    });
  }
  static async checkLocationExists(req, res, next) {
    const { name } = req.body;
    const location = await Location.findOne({ name });
    if (location) return res.status(400).json({ error: 'Location already exists!' });
    return next();
  }

  static async validateUserBody(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(4).required()
    };
    Joi.validate(req.body, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0].message });
      return next();
    });
  }

  static async checkUserExists(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists!' });
    return next();
  }
}

export default Validator;
