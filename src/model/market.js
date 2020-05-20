import {
  Schema,
  model
} from 'mongoose'
import geocoder from '../utils/geocoder'

const MarketSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please add a market name']
  },
  description: {
    type: String,
    required: [true, 'Please add a market description']
  },
  image: {
    type: Array,
    required: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// GeoCoder & create location
MarketSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Remove address
  this.address = undefined
  next()
})

export default model('Market', MarketSchema)