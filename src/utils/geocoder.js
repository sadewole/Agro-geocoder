import NodeGeocoder from 'node-geocoder'
import 'dotenv/config'

const options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optional depending on the providers
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_APIKEY,
  formatter: null
}

const geocoder = NodeGeocoder(options)

export default geocoder