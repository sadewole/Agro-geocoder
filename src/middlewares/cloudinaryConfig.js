import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

export const uploads = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file).then((result) => {
      resolve({
        url: result.secure_url,
        id: result.public_id
      })
    }).catch(err => {
      reject(err)
    })
  })
}
