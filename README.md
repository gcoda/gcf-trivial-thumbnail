# Trivial Cloud Storage Thumbnail

If you put a `assets/pictures/photo1.jpg` thumbnailer will put `thumbnail/height_256/assets/pictures/photo1.jpg`

Sizes and prefixes defined in [`src/sizes.js`](src/sizes.js)

`.options` for [sharp.resize()](http://sharp.pixelplumbing.com/en/stable/api-resize/)

`.prefix` for uploading `thumbnail/${prefix}`

## Deployed as google function

Change Google Cloud Project name in `package.json`
```json
"scripts": {
  "set-project": "gcloud config set project no-page",
}
```

You can change function name and triggering **bucket** `--trigger-resource`
```json
"scripts": {
  "deploy": "gcloud functions deploy thumbnailerAnigen --trigger-resource anigen ...",
}
```

Set env variables with
```bash
gcloud beta functions deploy thumbnailerAnigen \
  --update-env-vars S3_KEY='KEYKEYKEY' 
```

or just put a `.env` file if you noob like me `=)`
```
S3_KEY=KEYKEYKEYKEYKEYKEYKEYKEY
S3_SECRET=SECRETSECRETSECRETSECRETSECRETSECRETSECRETSECRET
S3_ENDPOINT=https://storage.googleapis.com
S3_BUCKET=anigen
```

## Test is not real

Just making sure `Promise.all(sizes.map(size => ({ ...size })` uploads
