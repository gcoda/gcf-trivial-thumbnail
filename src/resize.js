const sharp = require('sharp')

const { dirname, basename, extname } = require('path')

const thumbnailKey = ({ Key, prefix }) =>
  `.thumbnails/${Key}/${prefix}${extname(Key)}`

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
            Key: thumbnailKey({ Key, prefix }),
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

        // s3.putObject(
        //   {
        //     Key: `${dirname(Key)}/thumbnail/${prefix}/${basename(Key)}`,
        //     Body: resizedBuffer,
        //     Bucket,
        //     ContentType: sourceObject.ContentType,
        //     ACL: 'public-read',
        //   },
        //   (err, resizedObject) => {
        //     if (err) {
        //       reject(err)
        //     } else {
        //       resolve(resizedObject)
        //     }
        //   }
        // )
      })
  })
