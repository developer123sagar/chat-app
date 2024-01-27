import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});

export const uploadImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: "auto",
      folder: folder,
    }, async (err, result) => {
      if (err) {
        return reject(err.message)
      }
      return resolve(result)
    }).end(bytes)
  })
}