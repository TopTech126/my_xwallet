import { validateEOASign, validateETHSign } from '@/ui/utils/gnosis';
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import { isSameAddress } from '../utils';

export const validateConfirmation = (
  txHash: string,
  signature: string,
  ownerAddress: string,
  type: string,
  version: string,
  safeAddress: string,
  tx: SafeTransactionDataPartial,
  networkId: number,
  owners: string[]
) => {
  if (!owners.find((owner) => isSameAddress(owner, ownerAddress))) return false;
  switch (type) {
    case 'EOA':
      try {
        return validateEOASign(
          signature,
          ownerAddress,
          tx,
          version,
          safeAddress,
          networkId
        );
      } catch (e) {
        return false;
      }
    case 'ETH_SIGN':
      try {
        return validateETHSign(signature, txHash, ownerAddress);
      } catch (e) {
        return false;
      }
    default:
      return false;
  }
};
