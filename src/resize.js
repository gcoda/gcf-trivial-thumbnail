const sharp = require('sharp')
const { dirname, basename } = require('path')
module.exports = ({ s3, sourceObject, options, prefix, Key, Bucket }) =>
  new Promise((resolve, reject) => {
    console.log({ options })
    sharp(sourceObject.Body)
      .resize(options)
      .toBuffer()
      .then(resizedBuffer => {
        console.log(resizedBuffer.length)
        s3.putObject(
          {
            Key: `${dirname(Key)}/thumbnail/${prefix}/${basename(Key)}`,
            Body: resizedBuffer,
            Bucket,
            ContentType: sourceObject.ContentType,
            ACL: 'public-read',
          },
          (err, resizedObject) => {
            if (err) {
              reject(err)
            } else {
              resolve(resizedObject)
            }
          }
        )
      })
  })
