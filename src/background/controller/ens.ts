import { CHAINS } from '@debank/common';
import { ethers } from 'ethers';
import { preferenceService } from '../service';
import buildinProvider from '../utils/buildinProvider';

export const getResolver = async (name: string) => {
  const account = await preferenceService.getCurrentAccount();
  if (!account) throw new Error('no current account');
  buildinProvider.currentProvider.currentAccount = account.address;
  buildinProvider.currentProvider.currentAccountType = account.type;
  buildinProvider.currentProvider.currentAccountBrand = account.brandName;
  buildinProvider.currentProvider.chainId = CHAINS['ETH'].network;

  const provider = new ethers.providers.Web3Provider(
    buildinProvider.currentProvider
  );
  return provider.getResolver(name);
};

export const getEnsContentHash = async (name: string) => {
  return getResolver(name).then((resolver) => {
    return resolver.getContentHash();
  });
};
