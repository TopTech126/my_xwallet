import { Message } from '@/utils/message';
import PortMessage from '@/utils/message/portMessage';
import browser from 'webextension-polyfill';

import { EXTENSION_MESSAGES } from '@/constant/message';

const createDefer = <T>() => {
  let resolve: ((value: T) => void) | undefined;
  let reject: ((reason?: any) => void) | undefined;

  const promise: Promise<T> = new Promise(function (_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    promise,
    resolve,
    reject,
  };
};

declare global {
  interface Window {
    __RD_isDappSafeView?: boolean;
    __RD_isDappView?: boolean;
  }
}

const injectProviderScript = () => {
  // the script element with src won't execute immediately
  // use inline script element instead!
  // in prevent of webpack optimized code do some magic(e.g. double/sigle quote wrap),
  // separate content assignment to two line
  // use AssetReplacePlugin to replace pageprovider content
  const pageProviderURL = chrome.runtime.getURL('pageProvider.js');

  const outerContainer = document.head || document.documentElement;
  const outerScriptEle = document.createElement('script');
  
  const outerScript = `
if (!window.__RD_isDappSafeView && window.__RD_isDappView) {
  var container = document.head || document.documentElement;
  var ele = document.createElement('script');

  ele.setAttribute('src', '${pageProviderURL}');
  container.insertBefore(ele, container.children[0]);
  container.removeChild(ele);
}
`;
  outerScriptEle.textContent = outerScript;
  outerContainer.insertBefore(outerScriptEle, outerContainer.children[0]);
  outerContainer.removeChild(outerScriptEle);
};

const { BroadcastChannelMessage } = Message;

let pm: PortMessage | null;
let defer = createDefer<PortMessage>();

const bcm = new BroadcastChannelMessage({
  name: 'rabby-content-script',
  target: 'rabby-page-provider',
}).listen((data) => {
  if (pm) {
    return pm?.request(data);
  }
  return defer.promise.then((pm) => pm?.request(data));
});

// background notification

document.addEventListener('beforeunload', () => {
  bcm.dispose();
  pm?.dispose();
});

const handlePmMessage = (data) => bcm.send('message', data);

const onDisconnectDestroyStreams = (err) => {
  pm?.port?.onDisconnect.removeListener(onDisconnectDestroyStreams);
  pm?.off('message', handlePmMessage);

  pm?.dispose();
  pm = null;
  defer = createDefer<PortMessage>();
};

const setupExtensionStreams = () => {
  pm = new PortMessage().connect();
  pm?.on('message', handlePmMessage);
  defer.resolve?.(pm);
  pm?.port?.onDisconnect.addListener(onDisconnectDestroyStreams);
};

setupExtensionStreams();

const onMessageSetUpExtensionStreams = (msg) => {
  if (msg.name === EXTENSION_MESSAGES.READY) {
    if (!pm) {
      setupExtensionStreams();
    }
    return Promise.resolve(`Rabby: handled ${EXTENSION_MESSAGES.READY}`);
  }
  return undefined;
};
browser.runtime.onMessage.addListener(onMessageSetUpExtensionStreams);

injectProviderScript();
