#!/usr/bin/env bash

gcloud config set project no-page

gcloud functions deploy thumbnailerAnigen \
  --entry-point='app' \
  --runtime nodejs8 \
  --source='./src' \
  --trigger-resource anigen \
  --trigger-event google.storage.object.finalize \
  --region=europe-west1