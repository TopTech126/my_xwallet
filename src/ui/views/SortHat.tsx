import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getUiType, useApproval, useWallet } from 'ui/utils';
import { Spin } from 'ui/component';
import { Approval } from 'background/service/notification';
import browser from 'webextension-polyfill';
import { getOriginFromUrl } from '@/utils';

/**
 * @description used as router's Root Component in fact.
 */
const SortHat = () => {
  const wallet = useWallet();
  const [to, setTo] = useState('');
  // eslint-disable-next-line prefer-const
  let [getApproval] = useApproval();

  const UIType = getUiType();
  const history = useHistory();

  const loadView = async () => {
    const isInNotification = UIType.isNotification;
    const isInTab = UIType.isTab;
    const approval: Approval | undefined = await getApproval();
    if (isInNotification && !approval) {
      window.close();
      // // redirect back to dashboard on no approval
      // history.replace('/dashboard');

      return;
    }

    if (!(await wallet.isBooted())) {
      setTo('/welcome');
      // history.replace('/welcome');
      return;
    }

    await wallet.tryUnlock();
    if (!(await wallet.isUnlocked())) {
      setTo('/unlock');
      // history.replace('/unlock');
      return;
    }
    if (
      (await wallet.hasPageStateCache()) &&
      !UIType.isNotification &&
      !UIType.isTab &&
      !approval
    ) {
      const cache = (await wallet.getPageStateCache())!;
      if (cache.path && cache.path !== '/') {
        // prevent path is empty then extension will stuck
        setTo(cache.path + (cache.search || ''));
        return;
      } else {
        wallet.clearPageStateCache();
      }
    }

    if ((await wallet.getPreMnemonics()) && !UIType.isNotification && !UIType.isTab) {
      setTo('/create-mnemonics');
      // history.replace('/create-mnemonics');
      return;
    }

    const currentAccount = await wallet.getCurrentAccount();

    if (!currentAccount) {
      setTo('/no-address');
      // history.replace('/no-address');
    } else if (approval && UIType.isNotification) {
      setTo('/approval');
      // history.replace('/approval');
    } else {
      setTo('/dashboard');
      // history.replace('/dashboard');
    }
  };

  useEffect(() => {
    loadView();
    return () => {
      setTimeout(() => {
        const skeleton = document.querySelector('#skeleton');
        if (skeleton) {
          document.head.removeChild(skeleton);
        }
      }, 16);
    };
  }, []);
  
  const dappOriginRef = useRef<{
    url: string;
    tabId?: number;
  }>({ url: '', tabId: -1 });
  useEffect(() => {
    browser.tabs.getCurrent().then(tab => {
      if (dappOriginRef.current.url) return ;
      dappOriginRef.current = {
        url: tab.url ? getOriginFromUrl(tab.url) : '',
        tabId: tab.id,
      };
    });

    // const handleUpdated = async (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
    //   const oldVal = dappOriginRef.current;
    //   const newVal = getOriginFromUrl(changeInfo.url || tab.url || '');
    //   const approval = await wallet.getApproval();
    //   if (approval && oldVal.url && oldVal.url !== newVal) {
    //     await wallet.rejectAllApprovals();
    //     // history.replace('/');
    //     message.destroy();
    //     message.error('focusing Dapp changed! Reject approvals automatically.')

    //     window.close();
    //   }

    //   dappOriginRef.current = { url: newVal, tabId };
    // };

    // browser.tabs.onUpdated.addListener(handleUpdated);

    // return () => {
    //   browser.tabs.onUpdated.removeListener(handleUpdated);
    // }
  }, [ wallet ]);

  return (
    <div className="h-full flex items-center justify-center">
      {(UIType.isPop) ? (
        <>{to && <Redirect to={to} />}</>
      ) : (
        <Spin spinning={!to}>{to && <Redirect to={to} />}</Spin>
      )}
    </div>
  );
};

export default SortHat;
