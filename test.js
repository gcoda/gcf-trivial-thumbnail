require('dotenv').config()
const s3 = require('./src/s3')
const resize = require('./src/resize')
const sizes = require('./src/sizes')

const Key = 'screenshot/1/254/middleFrame.jpg'
const Bucket = 'anigen'

s3.getObject({ Bucket, Key }, (err, sourceObject) => {
  console.log(sourceObject)
  Promise.all(
    sizes.map(size => resize({ ...size, sourceObject, Key, Bucket, s3 }))
  ).then(results => {
    console.log(results)
    }).catch(error => {
    console.log(error)
  })
})
