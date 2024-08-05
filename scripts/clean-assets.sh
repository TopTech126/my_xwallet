script_dir="$( cd "$( dirname "$0"  )" && pwd  )"
project_dir=$(dirname "$script_dir")

if [ -z $RABBY_DESKTOP_REPO ]; then
    if [ -d $project_dir/../RabbyDesktop ]; then
        export RABBY_DESKTOP_REPO=$( cd "$project_dir/../RabbyDesktop" && pwd  )
        echo "[clean-assets] RABBY_DESKTOP_REPO is not set, use default: $RABBY_DESKTOP_REPO"
    fi
else
    echo "[clean-assets] RABBY_DESKTOP_REPO is set to: $RABBY_DESKTOP_REPO"
fi

if [ ! -z $RABBY_DESKTOP_REPO ]; then
    mkdir -p $RABBY_DESKTOP_REPO/assets/chrome_exts/rabby && rm -rf $RABBY_DESKTOP_REPO/assets/chrome_exts/rabby/* && cp -r _raw/* $RABBY_DESKTOP_REPO/assets/chrome_exts/rabby
else
    echo "[clean-assets] RABBY_DESKTOP_REPO is not set, skip clean assets."
    rm -rf $project_dir/dist && mkdir -p $project_dir/dist && cp -r _raw/* $project_dir/dist
fi