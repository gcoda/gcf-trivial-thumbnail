require('dotenv').config()
const s3 = require('./s3')
const sharp = require('sharp')

const resize = require('./resize')
const sizes = require('./sizes')

exports.app = (data, context, callback) => {

  const triggerObject = data

  const Bucket = triggerObject.bucket
  const Key = triggerObject.name

  if (
    context.eventType === 'google.storage.object.finalize' &&
    triggerObject.name.match(/\.jpg|\.jpeg$/) &&
    !triggerObject.name.match(/thumbnail\//)
  ) {
    console.log('Resize', { Bucket, Key })
    s3.getObject({ Key, Bucket }, (sourceError, sourceObject) => {
      console.log({sourceError})
      Promise.all(
        sizes.map(size => resize({ ...size, sourceObject, Key, Bucket, s3 }))
      )
        .then(uploads => {
          console.log({uploads})
          callback()
        })
        .catch(callback)
    })
  } else {
    console.log('Ignore', { Bucket, Key })
    callback()
  }
}
