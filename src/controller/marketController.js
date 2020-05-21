import {
  uploads
} from '../middlewares/cloudinaryConfig'
import {
  Market
} from '../model'

const marketController = {
  /**
   *
   * @param {respond json} res
   */
  async fetchAllMarket (req, res) {
    try {
      const market = await Market.find({})

      return res.status(200).json({
        success: true,
        count: market.length,
        data: market
      })
    } catch (err) {
      res.status(500).json({
        error: true,
        message: err
      })
    }
  },
  /**
   *
   * @param {name, address, description, images} req
   * @param {respond json} res
   */
  async addMarket (req, res) {
    try {
      const {
        name,
        address,
        description
      } = req.body

      const upload = (file) => uploads(file).then((res) => res)

      const images = req.files

      // const uploadedImages = await upload(images[0].path)
      // console.log('upload', uploadedImages)
      const uploadedImages = []
      for (const image of images) {
        const {
          path
        } = image
        const newPath = await upload(path)
        uploadedImages.push(newPath)
      }
      if (uploadedImages.length > 0) {
        const newMarket = await Market.create({
          name,
          address,
          description,
          image: uploadedImages
        })

        if (newMarket) {
          return res.status(201).json({
            success: true,
            data: newMarket
          })
        }
        return res.status(403).json({
          error: true,
          message: 'Oops!, Something went wrong. Try again'
        })
      }
    } catch (err) {
      console.log(err)
      if (err.code === 11000) {
        return res.status(400).json({
          error: true,
          message: 'This store already exist'
        })
      } else if (err.name === 'ValidationError') {
        return res.status(400).json({
          error: true,
          message: 'Validation Error! Please, field(s) must not be empty'
        })
      } else {
        res.status(500).json({
          error: true,
          message: 'Server error'
        })
      }
    }
  },

  async deleteMarket (req, res) {
    try {
      await Market.findOneAndDelete({
        _id: req.params.id
      })
      res.status(200).json({
        success: true,
        message: 'Deleted successfully'
      })
    } catch (error) {
      res.status(500).json({
        error: true,
        message: 'Server error'
      })
    }
  }
}

export default marketController
