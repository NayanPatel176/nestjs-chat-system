import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  breed: {
    type: String,
    require: true,
  },
});
