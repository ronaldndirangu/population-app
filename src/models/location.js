import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// const subLocationSchema =  new Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   name: { type: String, required: true, unique: true },
//   females: { type: Number, required: true },
//   males: { type: Number, required: true }
// });

const locationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  females: { type: Number, required: true },
  males: { type: Number, required: true },
  subLocations: { type: Array, required: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('Location', locationSchema);