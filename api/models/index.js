import mongoose, { Schema } from 'mongoose';

export const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: String
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
  })
);

export const Membership = mongoose.model(
  'Membership',
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    eventId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    isAdmin: { type: Boolean, required: true, default: false }
    // guide
    // joined?
    // ticket?
  })
);

export const Event = mongoose.model(
  'Event',
  new Schema({
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
      dropDups: true
    },
    title: { type: String, required: true },
    description: String
  })
);

export const Dream = mongoose.model(
  'Dream',
  new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, index: true },
    slug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    teamIds: [Schema.Types.ObjectId],
    budget: String,
    minGrant: Number
  })
);

export default {
  User,
  Membership,
  Event,
  Dream
};