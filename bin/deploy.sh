#!/bin/bash

# vars
ARCHIVE_NAME=build.zip
FOLDER_NAME=build
REMOTE_RELEASES_PATH=$DEPLOY_PATH

set -o errexit # Exit on error

yarn build

# Zip project
zip -r $ARCHIVE_NAME $FOLDER_NAME

# Remote commands
# Copy zip
scp -P $DEPLOY_PORT $ARCHIVE_NAME $DEPLOY_ADDRESS:$REMOTE_RELEASES_PATH
# Unzip and remove archive
ssh $DEPLOY_ADDRESS -p $DEPLOY_PORT "
    cd $REMOTE_RELEASES_PATH &&
    unzip $ARCHIVE_NAME &&
    rm $ARCHIVE_NAME &&
    ln -sfn $FOLDER_NAME ./current
"

# Remove local archive
rm $ARCHIVE_NAME
