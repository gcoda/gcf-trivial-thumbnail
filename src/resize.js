const sharp = require('sharp')
module.exports = ({s3, sourceObject, options, prefix, Key, Bucket}) =>
  new Promise((resolve, reject) => {
    console.log({options})
    sharp(sourceObject.Body)
      .resize(options)
      .toBuffer()
      .then(resizedBuffer => {
        console.log(resizedBuffer.length)
        s3.putObject(
          {
            Key: 'thumbnail/' + prefix + '/' + Key,
            Body: resizedBuffer,
            Bucket,
            ContentType: sourceObject.ContentType,
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
