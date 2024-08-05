const path = require('path');
const fs = require('fs');

const appRoot = fs.realpathSync(path.resolve(__dirname, '..'));

let desktopRepo = process.env.RABBY_DESKTOP_REPO || path.join(appRoot, '../RabbyDesktop');
if (!fs.existsSync(desktopRepo)) {
  console.log('RabbyDesktop repo not found at ' + desktopRepo);
  desktopRepo = null;
} else {
  console.log('Using RabbyDesktop repo at ' + desktopRepo);
};

const rootResolve = path.resolve.bind(path, appRoot);
const distDir = desktopRepo ? path.resolve(desktopRepo, './assets/chrome_exts/rabby') : rootResolve('dist');
const distResolve = path.resolve.bind(path, distDir);

module.exports = {
  root: appRoot,
  src: rootResolve('src'),
  popupHtml: rootResolve('src/ui/popup.ejs'),
  notificationHtml: rootResolve('src/ui/notification.html'),
  indexHtml: rootResolve('src/ui/index.html'),
  backgroundHtml: rootResolve('src/background/background.html'),
  offscreenHtml: rootResolve('src/offscreen/offscreen.html'),
  dist: distDir,

  rootResolve,
  distResolve,
};
