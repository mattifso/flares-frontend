#!/bin/bash
npm run build
DEPLOY_PATH='../flares-backend/build'
rm -rf "$DEPLOY_PATH"
cp -R build "$DEPLOY_PATH"



