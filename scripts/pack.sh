#!/usr/bin/env sh
set -e

script_dir="$( cd "$( dirname "$0"  )" && pwd  )"
project_dir=$(dirname "$script_dir")

if [ -d $project_dir/../RabbyDesktop ]; then
    RABBY_DESKTOP_REPO=$( cd "$project_dir/../RabbyDesktop" && pwd  )
fi

export VERSION=$(node --eval="process.stdout.write(require('./package.json').version)");
export RABBYX_GIT_HASH=$(git rev-parse --short HEAD);
export CURRENT_TIME=$(date +%Y%m%d%H%M%S);

TARGET_FILE=$project_dir/tmp/RabbyX-v${VERSION}-${RABBYX_GIT_HASH}.zip;

echo "[pack] VERSION is $VERSION";
echo "[pack] RABBY_DESKTOP_REPO is $RABBY_DESKTOP_REPO";

# for windows, download zip.exe from http://stahlworks.com/dev/index.php?tool=zipunzip and add to your path

# rm -rf $RABBY_DESKTOP_REPO/assets/chrome_exts/rabby;
if [ -z $NO_BUILD ]; then
    yarn;
    yarn build:pro;
fi
echo "[pack] built finished";

DIST_DIR=$project_dir/dist;
if [ ! -z $RABBY_DESKTOP_REPO ]; then
    DIST_DIR=$RABBY_DESKTOP_REPO/assets/chrome_exts/rabby;
fi

rm -rf $project_dir/tmp/ && mkdir -p $project_dir/tmp/;
if [ -d $DIST_DIR ]; then
    cd $DIST_DIR;
    zip -r $TARGET_FILE ./*
else
    echo "[pack] dist dir not found: $DIST_DIR";
fi

cd $project_dir;
cp $TARGET_FILE $project_dir/tmp/RabbyX-latest.zip

DOWNLOAD_URL="https://download.rabby.io/_tools/RabbyX-v${VERSION}-${RABBYX_GIT_HASH}.zip"

# upload to storage
if [ -z $NO_UPLOAD ]; then
    INVALIDATION_BASE="/_tools/RabbyX-v${VERSION}-${RABBYX_GIT_HASH}*"
    JSON="{'Paths': {'Quantity': 2,'Items': ['$INVALIDATION_BASE', '/_tools/RabbyX-latest.zip']}, 'CallerReference': 'cli-rabbyx-${VERSION}-${RABBYX_GIT_HASH}-${CURRENT_TIME}'}"
    echo $(node -e "console.log(JSON.stringify($JSON, null, 2))") > "$project_dir/tmp/inv-batch.json"
    aws s3 cp $project_dir/tmp/ s3://$RABBY_BUILD_BUCKET/rabby/_tools/ --recursive --exclude="*" --include "*.zip" --acl public-read
    echo "[pack] uploaded. DOWNLOAD_URL is $DOWNLOAD_URL";

    if [ ! -z $CI ]; then
        node ./scripts/notify-lark.js "$DOWNLOAD_URL"
    else
        aws cloudfront create-invalidation --distribution-id E1F7UQCCQWLXXZ --invalidation-batch file://./tmp/inv-batch.json
        echo "[pack] invalidation finished.";
    fi
fi

if [ ! -z $RABBY_DESKTOP_REPO ]; then
    # cp to RabbyDesktop
    rm -rf $RABBY_DESKTOP_REPO/release/rabbyx/ && mkdir -p $RABBY_DESKTOP_REPO/release/rabbyx/;
    cp $TARGET_FILE $RABBY_DESKTOP_REPO/release/rabbyx/
    cp $TARGET_FILE $RABBY_DESKTOP_REPO/release/rabbyx/RabbyX-latest.zip
fi

echo "[pack] finished.";
