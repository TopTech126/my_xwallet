import { ExplainTxResponse } from '@rabby-wallet/rabby-api/dist/types';
import { getMintRabbyContractAddress } from './mint-rabby-abi';
import IconRabbySVG from 'src/ui/assets/dashboard/rabby.svg';
import RabbyNFTSVG from './nft.svg';
import { isSameAddress } from '@/ui/utils';

export const genMintRabbyTxDetail = (
  txDetail: ExplainTxResponse
): ExplainTxResponse => {
  if (!txDetail.type_call) {
    return txDetail;
  }

  const { contract } = txDetail.type_call;
  if (!isSameAddress(contract, getMintRabbyContractAddress())) {
    return txDetail;
  }
  const nftList = txDetail.balance_change.receive_nft_list;
  return {
    ...txDetail,
    balance_change: {
      ...txDetail.balance_change,
      receive_nft_list: nftList?.length
        ? [
            {
              ...nftList[0],
              name: 'Rabby Desktop Genesis #' + nftList[0].inner_id,
              content: RabbyNFTSVG,
              content_type: 'image_url',
              collection: {
                name: 'Rabby Desktop Genesis',
              } as any,
            },
          ]
        : [],
    },
    type_call: {
      ...txDetail.type_call,
      contract_protocol_name: 'Rabby Desktop',
      contract_protocol_logo_url: IconRabbySVG,
    },
  };
};
